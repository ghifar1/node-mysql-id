"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kondisi = exports.mysqlId = void 0;
const mysql_1 = __importDefault(require("mysql"));
const helper_1 = require("./lib/helper");
Object.defineProperty(exports, "kondisi", { enumerable: true, get: function () { return helper_1.kondisi; } });
class MysqlId {
    constructor() {
        this.sequel = '';
        this.koneksi = mysql_1.default.createConnection({
            database: 'localhost',
        });
    }
    hubungkan(configuration) {
        this.koneksi = mysql_1.default.createConnection(configuration);
        try {
            this.koneksi.connect();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    pilihAtribut(atribut) {
        this.sequel = `SELECT ${atribut}`;
        return this;
    }
    hapusDariTabel(tabel) {
        this.sequel = `DELETE FROM ${tabel}`;
    }
    dariTabel(tabel) {
        this.sequel += ` from ${tabel}`;
        return this;
    }
    dimana(atribut, operator, nilai) {
        this.sequel += ` WHERE ${atribut}${operator ? ` ${operator}` : ""}` + (nilai ? ` '${nilai}'` : "");
        return this;
    }
    danDimana(atribut, operator, nilai) {
        this.sequel += ` AND ${atribut}${operator ? ` ${operator}` : ""} ` + (nilai ? `' ${nilai}'` : "");
        return this;
    }
    atauDimana(atribut, operator, nilai) {
        this.sequel += ` OR ${atribut}${operator ? ` ${operator}` : ""} ` + (nilai ? `' ${nilai}'` : "");
        return this;
    }
    adaDi(val) {
        let arr = '';
        let maxArr = val.length;
        val.forEach((value, index) => {
            if (index == 0) {
                arr += "(";
            }
            arr += `'${value}'`;
            if (index != maxArr - 1) {
                arr += ",";
            }
            else {
                arr += ")";
            }
        });
        this.sequel += ` IN ${arr}`;
        return this;
    }
    tidakAdaDi(val) {
        let arr = '';
        let maxArr = val.length;
        val.forEach((value, index) => {
            if (index == 0) {
                arr += "(";
            }
            arr += `'${value}'`;
            if (index != maxArr - 1) {
                arr += ",";
            }
            else {
                arr += ")";
            }
        });
        this.sequel += ` NOT IN ${arr}`;
        return this;
    }
    diantara(val) {
        this.sequel += ` BETWEEN ` + (typeof val === "string" ? `'${val}'` : val);
        return this;
    }
    tidakAdaDiantara(val) {
        this.sequel += ` NOT BETWEEN ` + (typeof val === "string" ? `'${val}'` : val);
        return this;
    }
    dan(val) {
        this.sequel += " AND " + (typeof val === "string" ? `'${val}'` : val);
        return this;
    }
    urutBerdasarkan(atribut) {
        this.sequel += ` ORDER BY ${atribut}`;
    }
    /*
    *
    */
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
