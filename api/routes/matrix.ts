import express from 'express'
import { ControllerMatrix } from '../controllers/matrix'

const RouteMatrix = express.Router()

RouteMatrix.post('/', ControllerMatrix.create)
RouteMatrix.get('/', ControllerMatrix.findAll)
RouteMatrix.get('/:id', ControllerMatrix.findById)
RouteMatrix.put('/:id', ControllerMatrix.update)
RouteMatrix.post('/edit', ControllerMatrix.updateByIdKriteriaIdAlternatif)
RouteMatrix.delete('/:id', ControllerMatrix.delete)

export default RouteMatrix
