const assert = require('assert')
const api = require('./../api')
let app = {}

describe('Suite de teste da API Heroes', function () {
  this.beforeAll(async () => {
    app = await api
  })

  it('listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois',
    })
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(JSON.parse(result.payload)))
  })
})
