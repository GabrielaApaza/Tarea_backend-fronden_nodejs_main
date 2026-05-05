const User = require('../../model/userModel')

exports.registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body
        if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' })

        const existing = await User.findOne({ where: { email } })
        if (existing) return res.status(400).json({ error: 'Usuario ya existe' })

        const usuario = await User.create({ name: nombre || email, email, password })
        // return a simple token (not JWT) for frontend storage
        const token = `token-${usuario.id}`
        res.status(201).json({ token, usuario })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' })

        const usuario = await User.findOne({ where: { email, password } })
        if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' })

        const token = `token-${usuario.id}`
        res.status(200).json({ token, usuario })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
