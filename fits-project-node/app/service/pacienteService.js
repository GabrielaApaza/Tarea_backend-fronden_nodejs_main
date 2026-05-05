const Paciente = require('../model/pacienteModel')

class PacienteService {
    async getAll() {
        return await Paciente.findAll()
    }

    async getById(id) {
        return await Paciente.findByPk(id)
    }

    async create(data) {
        return await Paciente.create(data)
    }

    async update(id, data) {
        await Paciente.update(data, { where: { id } })
        return await Paciente.findByPk(id)
    }

    async delete(id) {
        const paciente = await Paciente.findByPk(id)
        if (paciente) await Paciente.destroy({ where: { id } })
        return paciente
    }
}

module.exports = PacienteService
