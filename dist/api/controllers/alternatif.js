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
exports.ControllerAlternatif = void 0;
const alternatif_1 = require("../models/alternatif");
const matrix_1 = require("../models/matrix");
exports.ControllerAlternatif = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log('data', data);
            const result = yield alternatif_1.ModelAlternatif.create(data);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield alternatif_1.ModelAlternatif.findAll();
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    findById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield alternatif_1.ModelAlternatif.findById(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield alternatif_1.ModelAlternatif.update(req.params.id, req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield alternatif_1.ModelAlternatif.delete(req.params.id);
            yield matrix_1.ModelMatrix.deleteByAlternatif(req.params.id);
            res.status(200).json({ message: 'Data Deleted' });
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
};
