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
exports.ModelKriteria = void 0;
const db_1 = require("../utils/db");
exports.ModelKriteria = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.kriteria.create({ data });
    }),
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.kriteria.findMany();
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.kriteria.findUnique({ where: { id } });
    }),
    update: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.kriteria.update({ where: { id }, data });
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.kriteria.delete({ where: { id } });
    }),
    deleteMany: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.prisma.kriteria.deleteMany();
    }),
};
