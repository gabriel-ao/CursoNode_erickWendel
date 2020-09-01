const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super()
    this.db = db
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      handler: (request, headers) => {
        // recebendo os dados em try/catch para validar o que precisa
        try {
          // desestruturando dados para pegar apenas os dados importantes passados pela query
          const { skip, limit, nome } = request.query
          let query = {}
          if (nome) {
            query.nome = nome
          }
          if (isNaN(skip) && skip) {
            throw Error('O tipo do skip é incorreto')
          }
          if (isNaN(limit) && limit) {
            throw Error('O tipo do limit é incorreto')
          }

          return this.db.read(query, parseInt(skip), parseInt(limit))
        } catch (error) {
          console.log('Deu ruim', error)
          return 'Erro interno no servidor'
        }
      },
    }
  }
}

module.exports = HeroRoutes
