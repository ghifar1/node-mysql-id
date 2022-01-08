import mysql, { ConnectionConfig, Connection, FieldInfo, MysqlError } from 'mysql'
import { HasilQuery, Operator, Statement } from './lib/intrfc'
import { kondisi } from './lib/helper'

class MysqlId {
    private koneksi: Connection
    public sequel: string

    constructor() {
        this.sequel = ''
        this.koneksi = mysql.createConnection({
            database: 'localhost',
        })
    }

    public hubungkan(configuration: ConnectionConfig) {
        this.koneksi = mysql.createConnection(configuration)
        try {
            this.koneksi.connect()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    public pilihAtribut(atribut: string): this {
        this.sequel = `SELECT ${atribut}`
        return this
    }

    public hapusDariTabel(tabel: string): void {
        this.sequel = `DELETE FROM ${tabel}`
    }

    public dariTabel(tabel: string): this {
        this.sequel += ` from ${tabel}`
        return this
    }


    public dimana(atribut: string, operator?: string, nilai?: string): this {
        this.sequel += ` WHERE ${atribut}${operator ? ` ${operator}` : ""}` + (nilai ? ` '${nilai}'` : "")
        return this
    }

    public danDimana(atribut: string, operator?: string, nilai?: string): this {
        this.sequel += ` AND ${atribut}${operator ? ` ${operator}` : ""} ` + (nilai ? `' ${nilai}'` : "")
        return this
    }

    public atauDimana(atribut: string, operator?: string, nilai?: string): this {
        this.sequel += ` OR ${atribut}${operator ? ` ${operator}` : ""} ` + (nilai ? `' ${nilai}'` : "")
        return this
    }

    public adaDi(val: Array<string>): this {
        let arr = ''
        let maxArr = val.length
        val.forEach((value, index) => {
            if (index == 0) {
                arr += "("
            }
            arr += `'${value}'`
            if (index != maxArr - 1) {
                arr += ","
            } else {
                arr += ")"
            }
        })
        this.sequel += ` IN ${arr}`
        return this
    }

    public tidakAdaDi(val: Array<string>): this {
        let arr = ''
        let maxArr = val.length
        val.forEach((value, index) => {
            if (index == 0) {
                arr += "("
            }
            arr += `'${value}'`
            if (index != maxArr - 1) {
                arr += ","
            } else {
                arr += ")"
            }
        })
        this.sequel += ` NOT IN ${arr}`
        return this
    }

    public diantara(val: string | number): this {
        this.sequel += ` BETWEEN ` + (typeof val === "string" ? `'${val}'` : val)
        return this
    }

    public tidakAdaDiantara(val: string | number): this {
        this.sequel += ` NOT BETWEEN ` + (typeof val === "string" ? `'${val}'` : val)
        return this
    }

    public dan(val: string | number): this {
        this.sequel += " AND " + (typeof val === "string" ? `'${val}'` : val)
        return this
    }

    public urutBerdasarkan(atribut: string) {
        this.sequel += ` ORDER BY ${atribut}`
    }

    public async dataPertama(): Promise<HasilQuery> {
        return new Promise<HasilQuery>((resolve, reject) => {
            this.koneksi.query(this.sequel, (error, result, fields) => {
                if (error) reject(error)

                if (result[0]) {
                    resolve({
                        hasil: result[0],
                        infoField: fields!
                    });
                } else {
                    resolve(result)
                }

            })
        })
    }


    /**
    * @deprecated gunakan dataPertama()
    */
    public async dapatPertama(): Promise<HasilQuery> {
        return new Promise<HasilQuery>((resolve, reject) => {
            this.koneksi.query(this.sequel, (error, result, fields) => {
                if (error) reject(error)

                if (result[0]) {
                    resolve({
                        hasil: result[0],
                        infoField: fields!
                    });
                } else {
                    resolve(result)
                }

            })
        })
    }

    public async semuaData(): Promise<HasilQuery> {
        return new Promise<HasilQuery>((resolve, reject) => {
            this.koneksi.query(this.sequel, (error, result, fields) => {
                if (error) reject(error)

                resolve({
                    hasil: result,
                    infoField: fields!
                })

            })
        })
    }

    public async KueriMentah(kueri: string): Promise<HasilQuery> {
        return new Promise<HasilQuery>((resolve, reject) => {
            this.koneksi.query(kueri, (error, result, fields) => {
                if (error) reject(error)
                resolve({
                    hasil: result,
                    infoField: fields!
                })
            })
        })
    }

}

const mysqlId = new MysqlId()

export {
    mysqlId,
    kondisi
}