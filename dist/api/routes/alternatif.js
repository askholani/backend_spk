"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alternatif_1 = require("../controllers/alternatif");
const RouterAlternatif = express_1.default.Router();
RouterAlternatif.post('/', alternatif_1.ControllerAlternatif.create);
RouterAlternatif.get('/', alternatif_1.ControllerAlternatif.findAll);
RouterAlternatif.get('/:id', alternatif_1.ControllerAlternatif.findById);
RouterAlternatif.put('/:id', alternatif_1.ControllerAlternatif.update);
RouterAlternatif.delete('/:id', alternatif_1.ControllerAlternatif.delete);
exports.default = RouterAlternatif;
