const Commander = require("commander");
const database = require("./database");
const Heroi = require("./heroi");

async function main() {
  Commander.version("v1")
    .option("-n, --nome [value]", "Nome do heroi")
    .option("-in, --individualidade [value]", "Poder do Heroi")
    .option("-st, --status [value]", "Status do Heroi")
    .option("-i, --id [value]", "Id do Heroi")
    .option("-c, --cadastrar", "Cadastrar um heroi")
    .option("-l, --listar", "Herois listados")
    .option("-d, --remover [value]", "Heroi excluido")
    .option("-u, --update [value]", "Heroi atualizado")
    .parse(process.argv);

  const heroi = new Heroi(Commander);

  try {
    if (Commander.cadastrar) {
      delete heroi.id;
      const resultado = await database.cadastrar(heroi);
      if (!resultado) {
        console.error("Heroi não foi cadastrado");
        return;
      }
      console.log("Heroi cadastrado com sucesso");
    }

    if (Commander.listar) {
      const resultado = await database.listar();
      if (!resultado) {
        console.error("personagens não listados, verifica na programação");
      }
      console.log("resultado -->", resultado);
    }

    if (Commander.remover) {
      const resultado = await database.remover(heroi.id);
      if (!resultado) {
        console.log("não foi possivel remover um personagem");
        return;
      }
      console.log("Personagem removido com sucesso");
    }

    if (Commander.update) {
      const idParaAtualizar = parseInt(Commander.update);

      // remover todas as chaves que estiverem com undefined | null
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await database.atualizar(
        idParaAtualizar,
        heroiAtualizar
      );

      if (!resultado) {
        console.error("O personagem não existe ou não foi possivel atualizar");
        return;
      }
      console.log("Heroi atualizado com sucesso");
    }
  } catch (error) {
    console.error("DEU RUIM ", error);
  }
}

main();
