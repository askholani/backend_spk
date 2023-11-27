"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bobotKriteria_1 = require("../controllers/bobotKriteria");
const RouterBobotKriteria = express_1.default.Router();
RouterBobotKriteria.post('/', bobotKriteria_1.ControllerBobotKritaria.create);
RouterBobotKriteria.get('/', bobotKriteria_1.ControllerBobotKritaria.findAll);
RouterBobotKriteria.post('/:id', bobotKriteria_1.ControllerBobotKritaria.findById);
RouterBobotKriteria.put('/:id', bobotKriteria_1.ControllerBobotKritaria.update);
RouterBobotKriteria.delete('/:id', bobotKriteria_1.ControllerBobotKritaria.delete);
exports.default = RouterBobotKriteria;
