// npm i hapi
//npm i vision inert hapi-swagger

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoutes = require('./routes/heroRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const app = new Hapi.Server({
  port: 4000,
})

function mapRoutes(instance, methods) {
  return methods.map((method) => instance[method]())
}

async function main() {
  const connection = MongoDB.connect()
  const mongoDb = new Context(new MongoDB(connection, HeroiSchema))

  const swaggerOption = {
    info: {
      title: 'API Herois - #CursoNodeBR',
      version: 'v1.9',
    },
    lang: 'pt',
  }

  await app.register([
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOption,
    },
  ])

  app.route(mapRoutes(new HeroRoutes(mongoDb), HeroRoutes.methods()))

  await app.start()
  console.log('Servidor rodando na porta', app.info.port)

  return app
}

module.exports = main()
