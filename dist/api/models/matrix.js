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
exports.ModelMatrix = void 0;
const db_1 = require("../utils/db");
exports.ModelMatrix = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.matrix.create({ data });
    }),
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.matrix.findMany();
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.matrix.findUnique({ where: { id } });
    }),
    findByKriteriaAlternatif: (id_alternatif, id_kriteria) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.matrix.findFirst({
            where: {
                id_alternatif,
                id_kriteria,
            },
        });
    }),
    update: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.matrix.update({ where: { id }, data });
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.matrix.delete({ where: { id } });
    }),
    deleteByKriteria: (id_kriteria) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.matrix.deleteMany({
            where: { id_kriteria: id_kriteria },
        });
    }),
    deleteByAlternatif: (id_alternatif) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.matrix.deleteMany({
            where: {
                id_alternatif: id_alternatif,
            },
        });
    }),
};
