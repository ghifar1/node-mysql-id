"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kondisi = void 0;
const kondisi = {
    sama_dengan: (val) => {
        return `= '${val}'`;
    },
    lebih_besar_dari: (val) => {
        return `> ${val}`;
    },
    lebih_besar_dari_sama_dengan: (val) => {
        return `>= ${val}`;
    },
    lebih_kecil_dari: (val) => {
        return `< ${val}`;
    },
    lebih_kecil_dari_sama_dengan: (val) => {
        return `<= ${val}`;
    },
    tidak_sama_dengan: (val) => {
        return `!= ${val}`;
    },
    seperti: (val) => {
        return `LIKE '${val}'`;
    },
};
exports.kondisi = kondisi;
