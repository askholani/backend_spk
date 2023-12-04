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
            const matrix = rawMatrix.map((item) => (Object.assign(Object.assign({}, item), { nilai: parseFloat(item.nilai) })));
            // console.log('matrix', matrix)
            const rawKriteria = yield ktriteria_1.ModelKriteria.findAll();
            // console.log('rawKriteria', rawKriteria)
            const kriteria = rawKriteria.map((item) => (Object.assign(Object.assign({}, item), { bobot: parseFloat(item.bobot) })));
            // console.log('kriteria', kriteria)
            // console.log('kriteria', kriteria)
            const alternatif = yield alternatif_1.ModelAlternatif.findAll();
            const data = (0, helpers_1.groupByKriteria)(matrix, kriteria);
            const minMax = (0, helpers_1.getMinMaxValues)(data, kriteria);
            const dataAlternatif = (0, helpers_1.groupByAlternatif)(matrix, kriteria, alternatif);
            // matrix normalisasi
            const normalisasi = (0, helpers_1.getNormalisasi)(dataAlternatif, minMax);
            // matrix tertimbang
            const tertimbang = (0, helpers_1.getTertimbang)(normalisasi, kriteria);
            // console.log('tertimbang1', tertimbang[0].data)
            const batas = (0, helpers_1.getMatriksBatas)(tertimbang);
            // matrix jarak alternatif
            const matrixAlternatif = (0, helpers_1.getAlternatif)(tertimbang, batas);
            // matrix hasil
            const matrixTotalKriteria = (0, helpers_1.getTotalKriteria)(matrixAlternatif);
            console.log('tertimbang2', tertimbang[0].data);
            switch (tipe) {
                case 'normalisasi':
                    result = normalisasi;
                    console.log('normalisasi', result);
                    break;
                case 'tertimbang':
                    result = tertimbang;
                    // console.log('tertimbang', tertimbang[0].data)
                    // console.log('tertimbang result', result[0].data)
                    break;
                case 'batas':
                    result = batas;
                    console.log('batas', result);
                    break;
                case 'alternatif':
                    result = matrixAlternatif;
                    console.log('aterlantif', result);
                    break;
                case 'hasil':
                    result = matrixTotalKriteria;
                    console.log('hasil', result);
                    break;
            }
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }),
};
