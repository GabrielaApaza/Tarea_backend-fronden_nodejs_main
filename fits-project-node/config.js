const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env'), override: true })

const readEnv = (name, fallback) => {
    const value = process.env[name]
    return value && value.trim() ? value : fallback
}

module.exports = {
    db: {
        host: readEnv('PG_HOST', 'localhost'),
        port: Number.parseInt(readEnv('PG_PORT', '5432'), 10),
        database: readEnv('PG_DATABASE', 'mydb-admin'),
        user: readEnv('PG_USER', 'postgres'),
        password: readEnv('PG_PASSWORD', 'admin123'),
        dialect: readEnv('DB_CONNECTION', 'postgres')
    }
}
