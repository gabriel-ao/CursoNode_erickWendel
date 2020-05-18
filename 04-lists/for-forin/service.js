const axios = require('axios')

const URL = 'https://pokeapi.co/api/v2/pokemon-form/'

async function GetPokemonByName (nome) {
    const url = `${URL}/${nome}&format=json`
    const response = await axios.get(URL)
    return response.data
}

// GetPokemonByName(GetPokemonByName).then(function(resultado){
//     console.log('resultado', resultado)
// }).catch(function(error){
//     console.error('Deu ruim -->', error)
// })

module.exports = {
    GetPokemonByName: GetPokemonByName
}
