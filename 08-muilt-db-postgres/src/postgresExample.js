// npm install sequelize
// npm i pg-hstore pg

const Sequelize = require('sequelize')
const driver = new Sequelize('herois', 'gabriel', 'gabriel', {
  host: 'localhost',
  dialect: 'postgres',
  quoteIdentifiers: false,
  operatorsAliases: false,
})

async function main() {
  const Herois = driver.define(
    'herois',
    {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING,
        required: true,
      },
      individualidade: {
        type: Sequelize.STRING,
        required: false,
      },
      status_herois: {
        type: Sequelize.STRING,
        required: false,
      },
    },
    {
      tableName: 'TB_HEROIS',
      freezeTableName: false,
      timestamps: false,
    }
  )
  await Herois.sync()
  await Herois.create({
    nome: 'Deku',
    individualidade: 'One for All',
    status_herois: 'Heroi',
  })
  const result = await Herois.findAll({ raw: true, attributes: ['nome'] })
  console.log('result', result)
}

main()
