"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalKriteria = exports.getAlternatif = exports.getMatriksBatas = exports.getTertimbang = exports.getNormalisasi = exports.getMinMaxValues = exports.groupByKriteria = exports.groupByAlternatif = void 0;
function groupByAlternatif(data, kriteria, alternatif) {
    const groupedData = [];
    data.forEach((item) => {
        const idAlternatif = item.id_alternatif;
        const existingGroup = groupedData.find((group) => group.id_alternatif === idAlternatif);
        const namaAlternatif = alternatif.find((itemAlt) => itemAlt.id === item.id_alternatif);
        const namaKriteria = kriteria.find((itemKri) => itemKri.id === item.id_kriteria);
        if (!existingGroup) {
            groupedData.push({
                id_alternatif: idAlternatif,
                nama_alternatif: namaAlternatif.nama,
                data: [
                    {
                        id_kriteria: item.id_kriteria,
                        nama_kriteria: namaKriteria.nama,
                        nilai: item.nilai,
                    },
                ],
            });
        }
        else {
            existingGroup.data.push({
                id_kriteria: item.id_kriteria,
                nama_kriteria: namaKriteria.nama,
                nilai: item.nilai,
            });
        }
    });
    return groupedData;
}
exports.groupByAlternatif = groupByAlternatif;
function groupByKriteria(data, kriteria) {
    const groupedData = [];
    data.forEach((item) => {
        const idKriteria = item.id_kriteria;
        const existingGroup = groupedData.find((group) => group.id_kriteria === idKriteria);
        const namaKriteria = kriteria.find((itemKri) => itemKri.id === item.id_kriteria);
        if (!existingGroup) {
            groupedData.push({
                id_kriteria: idKriteria,
                nama_kriteria: namaKriteria.nama,
                data: [
                    {
                        id_alternatif: item.id_alternatif,
                        nilai: item.nilai,
                    },
                ],
            });
        }
        else {
            existingGroup.data.push({
                id_alternatif: item.id_alternatif,
                nilai: item.nilai,
            });
        }
    });
    return groupedData;
}
exports.groupByKriteria = groupByKriteria;
function getMinMaxValues(data, kriteriaDB) {
    const result = [];
    data.forEach((kriteria) => {
        const idKriteria = kriteria.id_kriteria;
        let maxNilai = Number.MIN_VALUE;
        let minNilai = Number.MAX_VALUE;
        const jenis = kriteriaDB.find((item) => item.id === idKriteria);
        kriteria.data.forEach((dataItem) => {
            const nilai = dataItem.nilai;
            maxNilai = Math.max(maxNilai, nilai);
            minNilai = Math.min(minNilai, nilai);
        });
        result.push({
            id_kriteria: idKriteria,
            tipe: jenis.jenis,
            nama_kriteria: kriteria.nama_kriteria,
            max: maxNilai,
            min: minNilai,
        });
    });
    return result;
}
exports.getMinMaxValues = getMinMaxValues;
function getNormalisasi(data, minMax) {
    return data.map((alternatif) => {
        const newData = alternatif.data.map((dataItem) => {
            const matchingMaxItem = minMax.find((maxItem) => maxItem.id_kriteria === dataItem.id_kriteria);
            if (matchingMaxItem) {
                if (matchingMaxItem.tipe) {
                    return Object.assign(Object.assign({}, dataItem), { nilai: parseFloat(((dataItem.nilai - matchingMaxItem.min) /
                            (matchingMaxItem.max - matchingMaxItem.min)).toFixed(3)) });
                }
                else {
                    return Object.assign(Object.assign({}, dataItem), { nilai: parseFloat(((dataItem.nilai - matchingMaxItem.max) /
                            (matchingMaxItem.min - matchingMaxItem.max)).toFixed(3)) });
                }
            }
            else {
                return dataItem;
            }
        });
        return Object.assign(Object.assign({}, alternatif), { data: newData });
    });
}
exports.getNormalisasi = getNormalisasi;
function getTertimbang(normalisasi, kriteria) {
    return normalisasi.map((item) => {
        const newData = item.data.map((item2) => {
            const kriteriaData = kriteria.find((itemKri) => itemKri.id === item2.id_kriteria);
            const bobot = kriteriaData.bobot / 100;
            return Object.assign(Object.assign({}, item2), { nilai: item2.nilai * bobot + bobot });
        });
        return {
            id_alternatif: item.id_alternatif,
            nama: item.nama_alternatif,
            data: newData,
        };
    });
}
exports.getTertimbang = getTertimbang;
function getMatriksBatas(tertimbang) {
    const groupedData = {};
    tertimbang.forEach((alternatif) => {
        let count = 0;
        let idKriteria = '';
        alternatif.data.forEach((kriteria, index) => {
            count++;
            idKriteria = kriteria.id_kriteria;
            if (!groupedData[idKriteria]) {
                groupedData[idKriteria] = {
                    nama_kriteria: kriteria.nama_kriteria,
                    total_nilai: 1,
                    count: 1,
                };
            }
            groupedData[idKriteria].total_nilai *= kriteria.nilai;
            groupedData[idKriteria].count++;
        });
    });
    const resultArray = Object.keys(groupedData).map((idKriteria) => ({
        id_kriteria: idKriteria,
        nama_kriteria: groupedData[idKriteria].nama_kriteria,
        total_nilai: parseFloat(Math.pow(groupedData[idKriteria].total_nilai, 1 / groupedData[idKriteria].count).toFixed(3)),
        count: groupedData[idKriteria].count,
    }));
    return resultArray;
}
exports.getMatriksBatas = getMatriksBatas;
function getAlternatif(data1, data2) {
    const hasilUpdate = [];
    data1.forEach((alternatif) => {
        const alternatifBaru = Object.assign({}, alternatif);
        alternatifBaru.data.forEach((kriteria) => {
            const totalKriteria = data2.find((total) => total.id_kriteria === kriteria.id_kriteria);
            if (totalKriteria) {
                kriteria.nilai = parseFloat((kriteria.nilai - totalKriteria.total_nilai).toFixed(3));
            }
        });
        hasilUpdate.push(alternatifBaru);
    });
    return hasilUpdate;
}
exports.getAlternatif = getAlternatif;
function getTotalKriteria(matrixAlternatif) {
    const hasilHitung = [];
    matrixAlternatif.forEach((alternatif) => {
        const totalNilai = alternatif.data.reduce((total, kriteria) => total + kriteria.nilai, 0);
        hasilHitung.push({
            id_alternatif: alternatif.id_alternatif,
            nama: alternatif.nama,
            total_nilai: parseFloat(totalNilai.toFixed(3)),
        });
    });
    return hasilHitung;
}
exports.getTotalKriteria = getTotalKriteria;
