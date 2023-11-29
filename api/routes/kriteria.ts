import express from 'express'
import { ControllerKriteria } from '../controllers/kriteria'

const RouterKriteria = express.Router()

RouterKriteria.post('/', ControllerKriteria.create)
RouterKriteria.get('/', ControllerKriteria.findAll)
RouterKriteria.get('/:id', ControllerKriteria.findById)
RouterKriteria.put('/:id', ControllerKriteria.update)
RouterKriteria.delete('/delete', ControllerKriteria.deleteMany)
RouterKriteria.delete('/:id', ControllerKriteria.delete)

export default RouterKriteria
