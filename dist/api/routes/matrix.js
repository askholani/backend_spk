"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const matrix_1 = require("../controllers/matrix");
const RouteMatrix = express_1.default.Router();
RouteMatrix.post('/', matrix_1.ControllerMatrix.create);
RouteMatrix.get('/', matrix_1.ControllerMatrix.findAll);
RouteMatrix.get('/:id', matrix_1.ControllerMatrix.findById);
RouteMatrix.put('/:id', matrix_1.ControllerMatrix.update);
RouteMatrix.post('/edit', matrix_1.ControllerMatrix.updateByIdKriteriaIdAlternatif);
RouteMatrix.delete('/:id', matrix_1.ControllerMatrix.delete);
exports.default = RouteMatrix;
