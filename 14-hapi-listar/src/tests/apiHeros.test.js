const assert = require('assert')
const api = require('./../api')
const { Console } = require('console')
let app = {}

describe('Suite de teste da API Heroes', function () {
  this.beforeAll(async () => {
    app = await api
  })

  it('listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois?skip=0&limit=10',
    })
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(JSON.parse(result.payload)))
  })

  it('listar /herois - deve retornar somente 10 registros', async () => {
    const TAMANHO_LIMITE = 3
    const QUANTIDADE_SKIPE = 0

    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=${QUANTIDADE_SKIPE}&limit=${TAMANHO_LIMITE}`,
    })
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    // transformando o objeto em json e dando um tamanho a ele para verificar a paginação
    assert.ok(JSON.parse(result.payload).length === TAMANHO_LIMITE)
  })

  it('listar /herois - deve retornar um erro com limit incorreto', async () => {
    const TAMANHO_LIMITE = 'AEEE'
    const QUANTIDADE_SKIPE = 0

    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=${QUANTIDADE_SKIPE}&limit=${TAMANHO_LIMITE}`,
    })
    const statusCode = result.statusCode
    assert.deepEqual(result.payload, 'Erro interno no servidor')
  })

  it('listar /herois - deve retornar somente 10 registros', async () => {
    const TAMANHO_LIMITE = 3
    const QUANTIDADE_SKIPE = 0
    const NOME = 'ZORO-1598141869941'

    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=${QUANTIDADE_SKIPE}&limit=${TAMANHO_LIMITE}&nome=${NOME}`,
    })
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    // transformando o objeto em json e dando um tamanho a ele para verificar a paginação
    assert.ok(JSON.parse(result.payload)[0].nome === NOME)
  })
})
