const assert = require('assert')

const MongoDb = require('../db/strategies/mongodb/mongodb')
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')

const Context = require('../db/strategies/base/contenxtStrategy')

// npm i --save-dev mocha

const MOCK_HEROI_CADASTAR = {
  nome: 'Kai Chisaki',
  habilidade: 'Overhaul',
  status: 'vilão',
}

const MOCK_HEROI_ATUALIZAR = {
  nome: `Patolino-${Date.now()}`,
  habilidade: 'Chato pra caralho',
  status: 'bronze',
}

const MOCK_HEROI_DEFAULT = {
  nome: `ZORO-${Date.now()}`,
  habilidade: 'Espada chin',
  status: 'Pirata',
}

let MOCK_HEROI_ID = ''

let context = {}

describe('MongoDB Suite de testes', function () {
  this.beforeAll(async () => {
    const connection = MongoDb.connect()
    context = new Context(new MongoDb(connection, HeroiSchema))
    await context.create(MOCK_HEROI_DEFAULT)
    const result = await context.create(MOCK_HEROI_ATUALIZAR)
    MOCK_HEROI_ID = result._id
  })

  it('verificar conexao', async () => {
    const result = await context.isConnected()
    const expected = 'Conectado'

    assert.deepEqual(result, expected)
  })

  it('Cadastrar', async () => {
    const { nome, habilidade, status } = await context.create(
      MOCK_HEROI_CADASTAR
    )

    assert.deepEqual({ nome, habilidade, status }, MOCK_HEROI_CADASTAR)
  })

  it('Listar', async () => {
    const result2 = await context.read({
      nome: MOCK_HEROI_DEFAULT.nome,
    })

    const [{ nome, habilidade, status }] = await context.read({
      nome: MOCK_HEROI_DEFAULT.nome,
    })

    const result = {
      nome,
      habilidade,
      status,
    }

    assert.deepEqual(result, MOCK_HEROI_DEFAULT)
  })

  it('Atualizar', async () => {
    const result = await context.update(MOCK_HEROI_ID, {
      nome: 'pernalonga',
    })

    assert.deepEqual(result.nModified, 1)
  })

  it('Remover', async () => {
    const result = await context.delete(MOCK_HEROI_ID)
    assert.deepEqual(result.n, 1)
  })
})
