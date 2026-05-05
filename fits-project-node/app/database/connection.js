const { Sequelize } = require('sequelize')
const { db } = require('../../config')

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: 'postgres',
    logging: false
})

sequelize.authenticate()
    .then(() => console.log('Conexión exitosa a PostgreSQL'))
    .catch(err => console.log('Error de conexión:', err))

module.exports = sequelize
