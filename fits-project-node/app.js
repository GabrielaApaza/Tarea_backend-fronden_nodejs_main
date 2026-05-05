const express = require('express')
const morgan = require('morgan')
const path = require('path')
const userLogin = require('./app/src/middlewares/userLogin')
const userRouter = require('./app/src/routers/userRouters')
const pacientesRouter = require('./app/src/routers/pacientesRouters')
const authRouter = require('./app/src/routers/authRouter')
const sequelize = require('./app/database/connection')

const port = 7000
const host = "localhost"
const app = express()

const allowedOrigins = new Set([
    'http://localhost:5173',
    'http://127.0.0.1:5173'
])

app.use((req, res, next) => {
    const origin = req.headers.origin

    if (allowedOrigins.has(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.setHeader('Vary', 'Origin')
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Max-Age', '86400')

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }

    next()
})

app.set('views', path.join(__dirname, 'app/src/views'))
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.json())
app.use(userLogin)

app.get('/', (req, res) => {
    const data = {
        title: 'Titulo de la pagina',
        message: 'Bienvenido',
        showMessage: true,
        items: [1, 2, 3, 4, 5]
    }
    res.render('index', data)
})

app.use('/users', userRouter)
app.use('/api/pacientes', pacientesRouter)
app.use('/api/auth', authRouter)

sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`http://${host}:${port}`)
    })
})
