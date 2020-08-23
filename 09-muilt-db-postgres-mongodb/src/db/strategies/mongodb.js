const Mongoose = require('mongoose')
const ICrud = require('./interfaces/interfaceCrud')

const STATUS = {
  0: 'Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando',
}
class MongoDB extends ICrud {
  constructor() {
    super()
    this._driver = null
    this._herois = null
  }
  async isConnected() {
    const state = STATUS[this._driver.readyState]

    if (state === 'Conectado') return state

    if (state !== 'Conectando') return state

    await new Promise((resolve) => setTimeout(resolve, 1000))
    return STATUS[this._driver.readyState]
  }

  defineMondel() {
    const heroiSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true,
      },
      habilidade: {
        type: String,
        default: 'não informado',
      },
      status: {
        type: String,
        required: true,
        default: 'não informado',
      },
      insertedAt: {
        type: Date,
        default: new Date(),
      },
    })

    this._herois = Mongoose.model('herois', heroiSchema)
  }

  connect() {
    //gabriel:gabriel@localhost:27017/pedb?authSource=pedb
    //exemplo
    Mongoose.connect(
      'mongodb://gabriel:gabriel@localhost:27017/herois',
      { useNewUrlParser: true },
      function (error) {
        if (!error) return

        console.log('Falha na conexão', error)
      }
    )

    const connection = Mongoose.connection
    this._driver = connection
    connection.once('open', () => console.log('database rodando!!'))
    this.defineMondel()
  }

  create(item) {
    return this._herois.create(item)
  }

  read(item, skip = 0, limit = 5) {
    return this._herois.find(item).skip(skip).limit(limit)

    //return this._herois.count()
  }

  update(id, item) {
    return this._herois.updateOne({ _id: id }, { $set: item })
  }
  delete(id) {
    return this._herois.deleteOne({ _id: id })
  }
}

module.exports = MongoDB
