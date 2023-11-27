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
exports.ControllerKriteria = void 0;
const ktriteria_1 = require("../models/ktriteria");
const matrix_1 = require("../models/matrix");
exports.ControllerKriteria = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { nama, bobot, jenis } = req.body;
        const data = {
            nama,
            bobot: JSON.parse(bobot),
            jenis: jenis === 'benefit' ? true : false,
        };
        try {
            const result = yield ktriteria_1.ModelKriteria.create(data);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ktriteria_1.ModelKriteria.findAll();
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    findById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ktriteria_1.ModelKriteria.findById(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { jenis, bobot, nama } = req.body;
            const value = {
                nama,
                jenis: jenis === 'benefit' ? true : false,
                bobot: parseInt(bobot),
            };
            const result = yield ktriteria_1.ModelKriteria.update(req.params.id, value);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield ktriteria_1.ModelKriteria.delete(req.params.id);
            yield matrix_1.ModelMatrix.deleteByKriteria(req.params.id);
            res.status(200).json({ message: 'Data Deleted' });
        }
        catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }),
};
