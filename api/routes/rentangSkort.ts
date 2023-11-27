import express from 'express'
import { ControllerRentangSkor } from '../controllers/rentangSkor'

const RouterRentangSkor = express.Router()

RouterRentangSkor.post('/', ControllerRentangSkor.create)
RouterRentangSkor.get('/', ControllerRentangSkor.findAll)
RouterRentangSkor.get('/:id', ControllerRentangSkor.findById)
RouterRentangSkor.put('/:id', ControllerRentangSkor.update)
RouterRentangSkor.delete('/:id', ControllerRentangSkor.delete)

export default RouterRentangSkor
