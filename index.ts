import mysql, { ConnectionConfig, Connection, FieldInfo, MysqlError } from 'mysql'

interface HasilQuery {
    hasil: any
    infoField: Array<FieldInfo>
}

class MysqlId {
    private koneksi: Connection
    public sequel: string

    constructor() {
        this.sequel = ''
        this.koneksi = mysql.createConnection('')
    }

    public async hubungkan(configuration: ConnectionConfig) {
        this.koneksi = mysql.createConnection(configuration)
        return new Promise((resolve, reject) => {
            this.koneksi.connect((err) => {
                reject(err)
            })
            resolve("Berhasil terhubung ke database")
        })
    }

    public pilihAtribut(atribut: string) {
        this.sequel = `SELECT ${atribut}`
        return this
    }

    public dariTabel(tabel: string) {
        this.sequel += ` from ${tabel}`
        return this
    }

    public dimana(atribut: string, operator: string, nilai: string) {
        this.sequel += ` WHERE ${atribut} ${operator} '${nilai}'`
        return this
    }

    public async dapatPertama() {
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

    public async semuaData() {
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

    public async KueriMentah(kueri: string) {
        return new Promise<HasilQuery>((resolve, reject) => {
            this.koneksi.query(kueri, (error, result, fields) => {
                if(error) reject(error)
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
    mysqlId
}