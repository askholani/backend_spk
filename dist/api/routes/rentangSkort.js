"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rentangSkor_1 = require("../controllers/rentangSkor");
const RouterRentangSkor = express_1.default.Router();
RouterRentangSkor.post('/', rentangSkor_1.ControllerRentangSkor.create);
RouterRentangSkor.get('/', rentangSkor_1.ControllerRentangSkor.findAll);
RouterRentangSkor.get('/:id', rentangSkor_1.ControllerRentangSkor.findById);
RouterRentangSkor.put('/:id', rentangSkor_1.ControllerRentangSkor.update);
RouterRentangSkor.delete('/:id', rentangSkor_1.ControllerRentangSkor.delete);
exports.default = RouterRentangSkor;
