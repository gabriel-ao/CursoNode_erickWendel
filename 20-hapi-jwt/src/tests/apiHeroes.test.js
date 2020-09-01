const assert = require('assert')
const api = require('../api')
let app = {}

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkdhYnJpZWwtYW8iLCJpZCI6MSwiaWF0IjoxNTk4NjU5OTY1fQ.m6Q2FWpPBshJAjoWOsd_7yrMVMHMGFmoMnGnIOmQA3s'

const headers = {
  Authorization: TOKEN,
}
const MOCK_HEROI_CADASTRAR = {
  nome: 'Homi de ferro',
  habilidade: 'foda pra caralho',
  status: 'heroi',
}

const MOCK_HEROI_ATUALIZAR = {
  nome: 'Capitão america',
  habilidade: 'patriota demais',
  status: 'heroi',
}

let MOCK_ID = ''

describe('Suite de teste da API Heroes', function () {
  this.beforeAll(async () => {
    app = await api
    const result = await app.inject({
      method: 'POST',
      url: `/herois`,
      headers,
      payload: MOCK_HEROI_ATUALIZAR,
    })

    const dados = JSON.parse(result.payload)
    MOCK_ID = dados._id
  })

  it('listar GET-simples /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois?skip=0&limit=10',
      headers,
    })
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(JSON.parse(result.payload)))
  })

  it('listar  GET-paginado /herois - deve retornar somente 10 registros', async () => {
    const TAMANHO_LIMITE = 3
    const QUANTIDADE_SKIPE = 0

    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=${QUANTIDADE_SKIPE}&limit=${TAMANHO_LIMITE}`,
      headers,
    })
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    // transformando o objeto em json e dando um tamanho a ele para verificar a paginação
    assert.ok(dados.length === TAMANHO_LIMITE)
  })

  it('listar GET-erro /herois - deve retornar um erro com limit incorreto', async () => {
    const TAMANHO_LIMITE = 'AEEE'
    const QUANTIDADE_SKIPE = 0

    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=${QUANTIDADE_SKIPE}&limit=${TAMANHO_LIMITE}`,
      headers,
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

  it('listar GET-nome -/herois - deve retornar somente 10 registros', async () => {
    const TAMANHO_LIMITE = 3
    const QUANTIDADE_SKIPE = 0
    const NOME = MOCK_HEROI_ATUALIZAR.nome

    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=${QUANTIDADE_SKIPE}&limit=${TAMANHO_LIMITE}&nome=${NOME}`,
      headers,
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
      headers,
      payload: MOCK_HEROI_CADASTRAR,
    })

    const statusCode = result.statusCode
    const { message, _id } = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.notDeepStrictEqual(_id, undefined)
    assert.deepEqual(message, 'Heroi cadastrado com sucesso!')
  })

  it('Atualizar PATCH - /herois:id', async () => {
    const _id = MOCK_ID
    const expected = {
      habilidade: 'DECA',
    }

    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      headers,
      payload: expected,
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.deepEqual(dados.message, 'Heroi atualizado com sucesso')
  })

  it('Atualizar PATCH - não deve atualizar com ID incorreto- /herois', async () => {
    const _id = `5f48f05faee6f309284f8aa4`

    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      headers,
      payload: {
        habilidade: 'DECOSO',
      },
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    const expected = {
      statusCode: 412,
      error: 'Precondition Failed',
      message: 'Id não encontrado no banco',
    }

    assert.ok(statusCode === 412)
    assert.deepEqual(dados.message, expected.message)
  })

  it('remover DELETE - /herois/:id', async () => {
    const _id = MOCK_ID
    const result = await app.inject({
      method: 'DELETE',
      url: `/herois/${_id}`,
      headers,
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.deepEqual(dados.message, 'Heroi Removido com sucesso')
  })

  it('remover DELETE - não deve remover - /herois/:id', async () => {
    const _id = `5f48f05faee6f309284f8aa4`
    const result = await app.inject({
      method: 'DELETE',
      url: `/herois/${_id}`,
      headers,
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
  })
})
