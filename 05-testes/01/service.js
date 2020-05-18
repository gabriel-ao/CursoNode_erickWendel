const { get } = require("axios");

const URL = "https://pokeapi.co/api/v2/pokemon-form";

async function GetPokemonByName(nome) {
  try {
    const url = `${URL}/${nome}`;

    const result = await get(url);
    console.log(result.data.pokemon);
    return result.data.pokemon;
  } catch (error) {
    console.log("error --> ", error);
  }
}

module.exports = {
  GetPokemonByName,
};
