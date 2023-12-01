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
exports.ControllerResult = void 0;
const alternatif_1 = require("../models/alternatif");
const ktriteria_1 = require("../models/ktriteria");
const matrix_1 = require("../models/matrix");
const helpers_1 = require("../utils/helpers");
exports.ControllerResult = {
    hasil: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tipe = req.query.tipe;
            let result = '';
            const rawMatrix = yield matrix_1.ModelMatrix.findAll();
            console.log('rawMatrix', rawMatrix);
            const matrix = rawMatrix.map((item) => (Object.assign(Object.assign({}, item), { nilai: parseFloat(item.nilai) })));
            console.log('matrix', matrix);
            const kriteria = yield ktriteria_1.ModelKriteria.findAll();
            const alternatif = yield alternatif_1.ModelAlternatif.findAll();
            const data = (0, helpers_1.groupByKriteria)(matrix, kriteria);
            const minMax = (0, helpers_1.getMinMaxValues)(data, kriteria);
            const dataAlternatif = (0, helpers_1.groupByAlternatif)(matrix, kriteria, alternatif);
            // matrix normalisasi
            const normalisasi = (0, helpers_1.getNormalisasi)(dataAlternatif, minMax);
            // matrix tertimbang
            const tertimbang = (0, helpers_1.getTertimbang)(normalisasi, kriteria);
            const batas = (0, helpers_1.getMatriksBatas)(tertimbang);
            // matrix jarak alternatif
            const matrixAlternatif = (0, helpers_1.getAlternatif)(tertimbang, batas);
            // matrix hasil
            const matrixTotalKriteria = (0, helpers_1.getTotalKriteria)(matrixAlternatif);
            switch (tipe) {
                case 'normalisasi':
                    result = normalisasi;
                    break;
                case 'tertimbang':
                    result = tertimbang;
                    break;
                case 'batas':
                    result = batas;
                    break;
                case 'alternatif':
                    result = matrixAlternatif;
                    break;
                case 'hasil':
                    result = matrixTotalKriteria;
                    break;
            }
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
};
