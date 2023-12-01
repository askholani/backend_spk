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
exports.ControllerMatrix = void 0;
const alternatif_1 = require("../models/alternatif");
const ktriteria_1 = require("../models/ktriteria");
const matrix_1 = require("../models/matrix");
const helpers_1 = require("../utils/helpers");
exports.ControllerMatrix = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id_alternatif, id_kriteria, nilai } = req.body;
            console.log('req.body', req.body);
            const data = {
                id_alternatif,
                id_kriteria,
                nilai,
            };
            const matrix = yield matrix_1.ModelMatrix.findByKriteriaAlternatif(id_alternatif, id_kriteria);
            if (matrix) {
                throw new Error('The value has been filled; please try filling another criteria or alternative.');
            }
            const result = yield matrix_1.ModelMatrix.create(data);
            res.status(201).json(result);
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: error.message || 'Internal Server Error' });
        }
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const matrix = yield matrix_1.ModelMatrix.findAll();
            const kriteria = yield ktriteria_1.ModelKriteria.findAll();
            const alternatif = yield alternatif_1.ModelAlternatif.findAll();
            const result = (0, helpers_1.groupByAlternatif)(matrix, kriteria, alternatif);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    findById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield matrix_1.ModelMatrix.findById(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield matrix_1.ModelMatrix.update(req.params.id, req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield matrix_1.ModelMatrix.delete(req.params.id);
            res.status(200).json({ message: 'Data Deleted' });
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
    updateByIdKriteriaIdAlternatif: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id_alternatif, id_kriteria, nilai } = req.body;
            const matrix = yield matrix_1.ModelMatrix.findByKriteriaAlternatif(id_alternatif, id_kriteria);
            const { id } = matrix;
            const data = {
                id_alternatif: id_alternatif,
                id_kriteria: id_kriteria,
                nilai,
            };
            console.log('data', data);
            const result = yield matrix_1.ModelMatrix.update(id, data);
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
        }
    }),
};
