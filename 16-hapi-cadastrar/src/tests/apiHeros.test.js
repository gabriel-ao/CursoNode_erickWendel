const assert = require('assert')
const api = require('./../api')
const { Console } = require('console')
let app = {}

const MOCK_HEROI_CADASTRAR = {
  nome: 'Homi de ferro',
  habilidade: 'foda pra caralho',
  status: 'heroi',
}

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
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode
    console.log(statusCode)

    assert.deepEqual(statusCode, 200)
    // transformando o objeto em json e dando um tamanho a ele para verificar a paginação
    assert.ok(dados.length === TAMANHO_LIMITE)
  })

  it('listar /herois - deve retornar um erro com limit incorreto', async () => {
    const TAMANHO_LIMITE = 'AEEE'
    const QUANTIDADE_SKIPE = 0

    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=${QUANTIDADE_SKIPE}&limit=${TAMANHO_LIMITE}`,
    })

    const errorResult = {
      statusCode: 400,
      error: 'Bad Request',
      message: 'child "limit" fails because ["limit" must be a number]',
      validation: { source: 'query', keys: ['limit'] },
    }

    assert.deepEqual(result.statusCode, 400)
    assert.deepEqual(result.payload, JSON.stringify(errorResult))
  })

  it('listar GET -/herois - deve retornar somente 10 registros', async () => {
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

  it('cadastrar POST - /herois', async () => {
    const TAMANHO_LIMITE = 5
    const QUANTIDADE_SKIPE = 0

    const result = await app.inject({
      method: 'POST',
      url: `/herois`,
      payload: MOCK_HEROI_CADASTRAR,
    })

    const statusCode = result.statusCode
    const { message, _id } = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.notDeepStrictEqual(_id, undefined)
    assert.deepEqual(message, 'Heroi cadastrado com sucesso!')
  })
})
