const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
  constructor() {
    super()
    this._driver = null
    this._herois = null
  }

  async isConnected() {
    try {
      await this._driver.authenticate()
      return true
    } catch (error) {
      console.log('fail postgres!', error)
      return false
    }
  }

  async defineModel() {
    this._herois = this._driver.define(
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
    await this._herois.sync()
  }

  async connect() {
    const Sequelize = require('sequelize')
    this._driver = new Sequelize('herois', 'gabriel', 'gabriel', {
      host: 'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false,
      operatorsAliases: false,
    })
    await this.defineModel()
  }
  async create(item) {
    const { dataValues } = await this._herois.create(item)
    return dataValues
  }

  async read(item = {}) {
    const [result] = await this._herois.findAll({ where: item, raw: true })
    return result
  }

  async update(id, item) {
    const [result] = await this._herois.update(item, { where: { id } })
    return result
  }

  async delete(id) {
    const query = id ? { id } : {}
    return this._herois.destroy({ where: query })
  }
}

module.exports = Postgres
