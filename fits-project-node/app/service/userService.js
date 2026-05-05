const User = require('../model/userModel')

class UserService {
    async getAll() {
        return await User.findAll()
    }

    async getById(id) {
        return await User.findByPk(id)
    }

    async create(data) {
        return await User.create(data)
    }

    async update(id, data) {
        await User.update(data, { where: { id } })
        return await User.findByPk(id)
    }

    async delete(id) {
        const user = await User.findByPk(id)
        if (user) await User.destroy({ where: { id } })
        return user
    }
}

module.exports = UserService
