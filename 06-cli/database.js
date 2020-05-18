const { readFile, writeFile } = require("fs");

const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.NOME_ARQUIVO = "herois.json";
  }

  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8");
    return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivo();
    // caso não tenha id, ele cria com base em data e concatena
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    const heroidComId = {
      id,
      ...heroi,
    };
    ///////

    const dadosFinal = [...dados, heroidComId];
    const result = await this.escreverArquivo(dadosFinal);
    return result;
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo();
    const dadosFiltrados = dados.filter((item) => (id ? item.id === id : true));
    return dadosFiltrados;
  }

  async remover(id) {
    if (!id) {
      return await this.escreverArquivo([]);
    }
    const dados = await this.obterDadosArquivo();
    const indice = dados.findIndex((item) => item.id === parseInt(id));
    //console.log("indice eh =>", indice);
    if (indice === -1) {
      throw Error("O usuario informado não existe");
    }

    dados.splice(indice, 1);
    return await this.escreverArquivo(dados);
  }

  async atualizar(id, novosDados) {
    // busca os dados
    const dados = await this.obterDadosArquivo();
    //console.log("atualizar - dados eh =>", dados);

    // verifica se o indice consta na lista, case não o indice será -1 e retornará um erro
    //console.log(id, " eee ", novosDados);
    const indice = dados.findIndex((item) => item.id == parseInt(id));

    //console.log("atualizar - indice eh =>", indice);
    if (indice === -1) {
      throw Error("O heroi informado não existe");
    }
    const atual = dados[indice];

    // const objetoAtual fará um merge entre atual e novosDados
    const objetoAtual = {
      ...atual,
      ...novosDados,
    };

    // remove o anterios da lista com o splice e logo em seguida adicona ele novamente
    dados.splice(indice, 1);
    return await this.escreverArquivo([...dados, objetoAtual]);
  }
}

module.exports = new Database();
