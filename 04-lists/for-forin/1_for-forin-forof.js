const service = require('./service')

async function main(){
    try{
        const result = await service.GetPokemonByName('charmeleon')
        const namesFor = []
        const namesForin = []
        const namesForof = []


        // ----------------------------
        // FOR            
        console.time("for")
        for(let i = 0; i < result.results.length; i ++){
                const Pokemon = result.results[i]
                namesFor.push(Pokemon.name)
            }
            console.timeEnd("for")
        
        // ----------------------------
        // FORIN
        console.time("forin")
        for(pokemon in result.results){
            const Pokemon = result.results[pokemon]
            namesForin.push(Pokemon.name)
        }
        console.timeEnd("forin")

        // ----------------------------
        // FOROF
        console.time("forof")
        for(pokemon of result.results){
            namesForof.push(pokemon.name)
        }
        console.timeEnd("forof")

        

        console.log('nomes: ',namesFor)
        console.log('nomes: ',namesForin)
        console.log('nomes: ',namesForof)
        console.log('quantidade: ', result.results.length)

    }catch(error){
        console.log("erro interno -->", error)
    }
}

main()