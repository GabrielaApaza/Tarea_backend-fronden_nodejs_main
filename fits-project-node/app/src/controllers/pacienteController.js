const PacienteService = require('../../service/pacienteService')
const pacienteService = new PacienteService()

exports.getAll = async (req, res) => {
    try {
        const pacientes = await pacienteService.getAll()
        res.status(200).json(pacientes)
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener pacientes', error: err.message })
    }
}

exports.get = async (req, res) => {
    try {
        const paciente = await pacienteService.getById(req.params.id)
        if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado' })
        res.status(200).json(paciente)
    } catch (err) {
        res.status(400).json({ message: 'ID inválido', error: err.message })
    }
}

exports.create = async (req, res) => {
    try {
        const paciente = await pacienteService.create(req.body)
        res.status(201).json(paciente)
    } catch (err) {
        res.status(400).json({ message: 'Error al crear paciente', error: err.message })
    }
}

exports.update = async (req, res) => {
    try {
        const paciente = await pacienteService.update(req.params.id, req.body)
        if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado' })
        res.status(200).json(paciente)
    } catch (err) {
        res.status(400).json({ message: 'Error al actualizar paciente', error: err.message })
    }
}

exports.delete = async (req, res) => {
    try {
        const paciente = await pacienteService.delete(req.params.id)
        if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado' })
        res.status(200).json({ message: 'Paciente eliminado correctamente' })
    } catch (err) {
        res.status(400).json({ message: 'Error al eliminar paciente', error: err.message })
    }
}
