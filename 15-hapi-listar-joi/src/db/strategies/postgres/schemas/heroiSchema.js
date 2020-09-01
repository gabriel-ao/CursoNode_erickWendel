const Sequelize = require('sequelize')

const HeroiSchema = {
  name: 'herois',
  schema: {
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
  options: {
    tableName: 'TB_HEROIS',
    freezeTableName: false,
    timestamps: false,
  },
}

module.exports = HeroiSchema
