"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kriteria_1 = require("../controllers/kriteria");
const RouterKriteria = express_1.default.Router();
RouterKriteria.post('/', kriteria_1.ControllerKriteria.create);
RouterKriteria.get('/', kriteria_1.ControllerKriteria.findAll);
RouterKriteria.get('/:id', kriteria_1.ControllerKriteria.findById);
RouterKriteria.put('/:id', kriteria_1.ControllerKriteria.update);
RouterKriteria.delete('/delete', kriteria_1.ControllerKriteria.deleteMany);
RouterKriteria.delete('/:id', kriteria_1.ControllerKriteria.delete);
exports.default = RouterKriteria;
