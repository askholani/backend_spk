import express from 'express'
import { ControllerResult } from '../controllers/result'

const RouterResult = express.Router()

RouterResult.get('/', ControllerResult.hasil)

export default RouterResult
