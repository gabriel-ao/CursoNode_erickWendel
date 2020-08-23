const assert = require('assert')

const Postgres = require('../db/strategies/postgres')

const Context = require('../db/strategies/base/contenxtStrategy')
// npm i --save-dev mocha

const context = new Context(new Postgres())

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

describe('postgres Strategy', function () {
  this.timeout(Infinity)
  this.beforeAll(async function () {
    await context.connect()
    await context.create(mock_heroi_atualizar)
    await context.delete()
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
