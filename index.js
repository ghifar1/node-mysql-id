"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlId = void 0;
const mysql_1 = __importDefault(require("mysql"));
class MysqlId {
    constructor() {
        this.sequel = '';
        this.koneksi = mysql_1.default.createConnection('');
    }
    async hubungkan(configuration) {
        this.koneksi = mysql_1.default.createConnection(configuration);
        return new Promise((resolve, reject) => {
            this.koneksi.connect((err) => {
                reject(err);
            });
            resolve("Berhasil terhubung ke database");
        });
    }
    pilihAtribut(atribut) {
        this.sequel = `SELECT ${atribut}`;
        return this;
    }
    dariTabel(tabel) {
        this.sequel += ` from ${tabel}`;
        return this;
    }
    dimana(atribut, operator, nilai) {
        this.sequel += ` WHERE ${atribut} ${operator} '${nilai}'`;
        return this;
    }
    async dapatPertama() {
        return new Promise((resolve, reject) => {
            this.koneksi.query(this.sequel, (error, result, fields) => {
                if (error)
                    reject(error);
                if (result[0]) {
                    resolve({
                        hasil: result[0],
                        infoField: fields
                    });
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async semuaData() {
        return new Promise((resolve, reject) => {
            this.koneksi.query(this.sequel, (error, result, fields) => {
                if (error)
                    reject(error);
                resolve({
                    hasil: result,
                    infoField: fields
                });
            });
        });
    }
    async KueriMentah(kueri) {
        return new Promise((resolve, reject) => {
            this.koneksi.query(kueri, (error, result, fields) => {
                if (error)
                    reject(error);
                resolve({
                    hasil: result,
                    infoField: fields
                });
            });
        });
    }
}
const mysqlId = new MysqlId();
exports.mysqlId = mysqlId;
