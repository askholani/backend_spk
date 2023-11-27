"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerBobotKritaria = void 0;
const bobotKriteria_1 = require("../models/bobotKriteria");
exports.ControllerBobotKritaria = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            const result = yield bobotKriteria_1.ModelBobotKriteria.create(data);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield bobotKriteria_1.ModelBobotKriteria.findAll();
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json('Server Error');
        }
    }),
    findById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const result = yield bobotKriteria_1.ModelBobotKriteria.findById(id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const data = req.body;
            const result = yield bobotKriteria_1.ModelBobotKriteria.update(id, data);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const result = yield bobotKriteria_1.ModelBobotKriteria.delete(id);
            res.status(200).json({ message: 'Data deleted' });
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
};
