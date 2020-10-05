const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  food: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ingredients: {
    type: Sequelize.JSON,
    defaultValue: '[]',
    get() {
      return JSON.parse(this.getDataValue('ingredients'))
    },
    set(value) {
      this.setDataValue('ingredients', JSON.stringify(value))
    },
  },
})

module.exports = Recipe
