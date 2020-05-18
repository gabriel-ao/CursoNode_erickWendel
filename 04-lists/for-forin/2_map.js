const service = require("./service");

Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = [];
  for (let indice = 0; indice <= this.length - 1; indice++) {
    const resultado = callback(this[indice], indice);
    novoArrayMapeado.push(resultado);
  }

  return novoArrayMapeado;
};
async function main() {
  try {
    const results = await service.GetPokemonByName(`a`);

    // results.results.forEach(function (item){
    //     names.push(item.name)
    // })

    // const names = results.results.map(function (pokemon){
    //     return pokemon.name
    // })
    const names = results.results.meuMap(function (pokemon, indice) {
      return `[${indice + 1}] ${pokemon.name}`;
    });

    console.log("names", names);
  } catch (error) {
    console.log("Deu ruim -->", error);
  }
}

main();
