const assert = require('assert')

const Postgres = require('../db/strategies/postgres/postgres')
const HeroiSchema = require('../db/strategies/postgres/schemas/heroiSchema')
const Context = require('../db/strategies/base/contextStrategy')
// npm i --save-dev mocha

const mock_heroi_cadastrar = {
  nome: 'Mirio Togata - lemillion',
  individualidade: 'permeabilidade',
  status_herois: 'aposentado invalidez',
}

const mock_heroi_atualizar = {
  nome: 'Mirio Togata - lemillion',
  individualidade: 'permeabilidade',
  status_herois: 'aposentado invalidez',
}

let context = {}

describe('postgres Strategy', function () {
  this.timeout(Infinity)
  this.beforeAll(async () => {
    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, HeroiSchema)
    context = new Context(new Postgres(connection, model))

    await context.delete()
    await context.create(mock_heroi_atualizar)
  })

  it('postgresql connection', async function () {
    const result = await context.isConnected()
    assert.equal(result, true)
  })

  it('Cadastrar personagem', async function () {
    const expected = mock_heroi_cadastrar
    const result = await context.create(mock_heroi_cadastrar)
    delete result.id
    assert.deepEqual(result, expected)
  })

  it('listar', async function () {
    const expected = mock_heroi_cadastrar
    const result = await context.read({ nome: mock_heroi_cadastrar.nome })
    delete result.id
    assert.deepEqual(result, expected)
  })

  it('Atualizar', async function () {
    const itemAtualizar = await context.read({
      nome: mock_heroi_atualizar.nome,
    })

    const novoItem = {
      ...mock_heroi_atualizar,
      nome: 'Mirio Togata',
    }

    const result = await context.update(itemAtualizar.id, novoItem)
    const itemAtualizado = await context.read({ id: itemAtualizar.id })
    assert.deepEqual(result, 1)
    assert.deepEqual(itemAtualizado.nome, novoItem.nome)
  })

  it('Remover por ID', async function () {
    const item = await context.read({})
    const result = await context.delete(item.id)
    assert.deepEqual(result, 1)
  })
})
