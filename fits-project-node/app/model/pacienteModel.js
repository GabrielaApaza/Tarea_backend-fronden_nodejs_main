const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Paciente = sequelize.define('Paciente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    especialidad: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'pacientes',
    timestamps: true
})

module.exports = Paciente
