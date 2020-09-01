const Mongoose = require('mongoose')
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

module.exports = this._herois
