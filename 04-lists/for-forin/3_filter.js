const { GetPokemonByName } = require("./service");

Array.prototype.MeuFiltro = function (callback) {
  const lista = [];
  for (item in this) {
    const result = callback(item, this);

    if (!result) continue;

    lista.push(item);
  }

  return lista;
};

async function main() {
  try {
    const { results } = await GetPokemonByName(`p`);

    const pokeFamilia = results.filter(
      (item) => item.name.toLowerCase().indexOf(`saur`) !== -1
    );

    const names = pokeFamilia.map((pokemon) => pokemon.name);

    console.log("nome: ", names);
  } catch (error) {
    console.error("o erro foi: ", error);
  }
}

main();
