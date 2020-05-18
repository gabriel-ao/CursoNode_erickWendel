const { deepEqual, ok } = require("assert");

const database = require("./database");

const DEFAULT_ITEM_CADASTRAR = {
  nome: "Toshinori Yagi - all might",
  individualidade: "One for all",
  status: "heroi",
  id: 1,
};

const DEFAULT_ITEM_ATUALIZAR = {
  nome: "Izuku Midoriya - Deku",
  individualidade: "One for alll",
  status: "heroi",
  id: 10,
};

describe("Suite de manipulão de herois", function () {
  //   this.beforeAll(async () => {
  //     //await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
  //     //await database.atualizar(DEFAULT_ITEM_ATUALIZAR);
  //   });

  it("deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await database.listar(expected.id);
    deepEqual(resultado, expected);
  });

  it("deve cadastrar um heroi, usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    await database.cadastrar(expected);
    const [actual] = await database.listar(expected.id);
    deepEqual(actual, expected);
  });

  it("deve remover um heroi por id", async () => {
    const expected = true;
    const result = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    deepEqual(result, expected);
  });

  it("deve atualizar o heroi pelo id", async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      individualidade: "One for all",
    };

    const novoDado = {
      individualidade: "One for all",
    };

    const idParametro = DEFAULT_ITEM_ATUALIZAR.id;
    const novoDadoParametro = novoDado;

    await database.atualizar(idParametro, novoDadoParametro);
    const [result] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);

    deepEqual(result, expected);
  });
});
