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
      config: {
        validate: {
          // payload -> body
          // headers -> header
          // params -> na URL :id
          // query -> ?skip=0&100
          failAction: (request, headers, erro) => {
            throw erro
          },
          query: {
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            nome: Joi.string().min(3).max(100),
          },
        },
      },
      handler: (request, headers) => {
        try {
          // desestruturando dados para pegar apenas os dados importantes passados pela query
          const { skip, limit, nome } = request.query

          const query = { nome: { $regex: `.*${nome}*` } }

          // verificando se o nome esta preenchido, se não ele passa objeto vazio
          return this.db.read(nome ? query : {}, skip, limit)
        } catch (error) {
          console.log('Deu ruim', error)
          return 'Erro interno no servidor'
        }
      },
    }
  }
}

module.exports = HeroRoutes
