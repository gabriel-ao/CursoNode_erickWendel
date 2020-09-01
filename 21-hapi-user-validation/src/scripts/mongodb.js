// docker ps

// docker exec -it f0420ddb62dd mongo -u admin -p admin --authenticationDatabase admin


// databases
show dbs

// mudando o contexto para uma database
use herois


// mostrar collections
show collections

db.herois.insert({
    nome: "deku",
    Habilidade: "One For All",
    dataNascimento: "1996-10-19"
})

db.herois.find()
db.herois.find().pretty()



for(let i=0; i<= 5000; i ++) {
    db.herois.insert({
        nome: 'deku',
        Habilidade: 'One For All',
        dataNascimento: '1996-10-19'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1})
db.herois.find({}, {poder: 1, _id: 0})

//create 
db.herois.insert({
    nome: 'deku',
    Habilidade: 'One For All',
    dataNascimento: '1996-10-19'
})


// read
db.herois.find()


//update
db.herois.update(
    { _id: ObjectId("5f3b26d1b770a82b2d74c3a4") },    
    { $set: {nome: 'mulher maraviguia'}}
)

//delete
db.herois.remove({})