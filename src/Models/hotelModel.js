const { INTEGER, DECIMAL } = require('sequelize')
const db = require('../db')

const Hotel = db.define('hotel', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: String,
        allowNull: false
    },
    price: DECIMAL,
    description: String
})


module.exports = Hotel