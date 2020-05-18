const { GetPokemonByName } = require("./service");

async function main() {
  try {
    const { results } = await GetPokemonByName(`b`);

    const pesos = results.map((item) => item.name);
    console.log("pesos: ", pesos);

    const total = pesos.reduce((anterior, proximo) => {
      return anterior + proximo;
    }, "");
    console.log("total: ", total);
  } catch (error) {
    console.log("Erro ->", error);
  }
}

main();
