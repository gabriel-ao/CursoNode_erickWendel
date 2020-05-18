const assert = require("assert");
const { GetPokemonByName } = require("./service");

// instalar o pacote nock para simular requisicoes
const nock = require("nock");

const scope = nock("https://pokeapi.co/api/v2/pokemon-form")
  .get("/bulbasaur")
  .reply(200, {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon-form/1/",
  });

describe("pokemon tests", function () {
  this.beforeAll(async () => {});

  it("deve buscar o bulbasaur com o formato correto", async () => {
    const expected = {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    };

    const nomeBase = "bulbasaur";
    const resultado = await GetPokemonByName(nomeBase);
    assert.deepEqual(resultado, expected);
  }),
    //////////////////////////////////
    it("não deve buscar um pokemon", async () => {
      // const expected = {
      //   name: "snorlax",
      //   url: "https://pokeapi.co/api/v2/pokemon/50/",
      // };
      // const nomeBase = "venusaur";
      // const resultado = await GetPokemonByName(nomeBase);
      // assert.notDeepEqual(resultado, expected);
    });
});
