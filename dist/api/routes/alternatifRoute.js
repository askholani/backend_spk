"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alternatifController_1 = require("../controllers/alternatifController");
const AlternatifRouter = express_1.default.Router();
AlternatifRouter.post('/', alternatifController_1.ControllerAlternatif.create);
AlternatifRouter.get('/', alternatifController_1.ControllerAlternatif.findAll);
AlternatifRouter.get('/:id', alternatifController_1.ControllerAlternatif.findById);
AlternatifRouter.put('/:id', alternatifController_1.ControllerAlternatif.update);
AlternatifRouter.delete('/:id', alternatifController_1.ControllerAlternatif.delete);
exports.default = AlternatifRouter;
