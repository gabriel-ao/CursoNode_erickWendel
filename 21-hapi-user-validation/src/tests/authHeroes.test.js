const assert = require('assert')
const api = require('../api')
const Context = require('./../db/strategies/base/contextStrategy')
const PostGres = require('./../db/strategies/postgres/postgres')
const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema')

let app = {}
const USER = {
  username: 'gabriel-ao',
  password: '1996',
}

const USER_DB = {
  username: USER.username.toLowerCase(),
  password: '$2b$04$N4QD/nJvJfxhjh56Dpz8ZuOhuXTDV01oheQN7WKJd4kacxrMvvVh2',
}

describe('Auth test suite', function () {
  this.beforeAll(async () => {
    app = await api

    const connectionPostgres = await PostGres.connect()
    const model = await PostGres.defineModel(connectionPostgres, UsuarioSchema)
    const postgres = new Context(new PostGres(connectionPostgres, model))
    //console.log('enviando no beforeALL', connectionPostgres)
    await postgres.update(null, USER_DB, true)
  })

  it('deve obter um token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER,
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.deepEqual(statusCode, 200)
    assert.ok(dados.token.length > 10)
  })

  it('deve retornar não autorizado ao tentar obter um login errado', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'gabriel',
        password: 'gabriel19',
      },
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.deepEqual(statusCode, 401)
    assert.deepEqual(dados.error, 'Unauthorized')
  })
})
