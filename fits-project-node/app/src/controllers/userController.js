const UserService = require('../../service/userService')
const userService = new UserService()

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAll()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: err.message })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id)
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ message: 'ID inválido', error: err.message })
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = await userService.create(req.body)
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json({ message: 'Error al crear usuario', error: err.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.update(req.params.id, req.body)
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ message: 'Error al actualizar usuario', error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.delete(req.params.id)
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        res.status(200).json({ message: 'Usuario eliminado correctamente' })
    } catch (err) {
        res.status(400).json({ message: 'Error al eliminar usuario', error: err.message })
    }
}
