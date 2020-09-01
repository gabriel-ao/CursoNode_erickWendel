const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const failAction = (request, headers, erro) => {
  throw erro
}

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
          return Boom.internal()
        }
      },
    }
  }

  create() {
    return {
      path: '/herois',
      method: 'POST',
      config: {
        validate: {
          failAction,
          payload: {
            nome: Joi.string().min(3).max(100),
            habilidade: Joi.string().min(2).max(20),
            status: Joi.string().min(2).max(10),
          },
        },
      },
      handler: async (request) => {
        try {
          const { nome, habilidade, status } = request.payload
          const result = await this.db.create({ nome, habilidade, status })
          return {
            message: 'Heroi cadastrado com sucesso!',
            _id: result._id,
          }
        } catch (error) {
          console.log('DEU RUIM', error)
          return Boom.internal()
        }
      },
    }
  }

  update() {
    return {
      path: '/herois/{id}',
      method: 'PATCH',
      config: {
        validate: {
          params: {
            id: Joi.string().required(),
          },
          payload: {
            nome: Joi.string().min(3).max(100),
            habilidade: Joi.string().min(2).max(20),
            status: Joi.string().min(2).max(10),
          },
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params

          const { payload } = request

          const dadosString = JSON.stringify(payload)
          const dados = JSON.parse(dadosString)

          const result = await this.db.update(id, dados)

          if (result.nModified !== 1)
            return Boom.preconditionFailed('Id não encontrado no banco')

          return {
            message: 'Heroi atualizado com sucesso',
          }
        } catch (error) {
          console.log('DEU RUIM', error)
          return Boom.internal()
        }
      },
    }
  }

  delete() {
    return {
      path: '/herois/{id}',
      method: 'DELETE',
      config: {
        validate: {
          failAction,
          params: {
            id: Joi.string().required(),
          },
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params
          const result = await this.db.delete(id)

          console.log('result delete ', result)

          if (result.n !== 1) {
            Boom.preconditionFailed('Id não encontrado no banco')
          }
          return {
            message: 'Heroi Removido com sucesso',
          }
        } catch (error) {
          console.log('DEU RUIM', error)
          return Boom.internal()
        }
      },
    }
  }
}

module.exports = HeroRoutes
