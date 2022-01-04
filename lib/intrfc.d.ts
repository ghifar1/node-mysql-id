import { FieldInfo } from 'mysql'

interface HasilQuery {
    hasil: any
    infoField: Array<FieldInfo>
}

interface Operator {
    dimana<TThis>(this: TThis, atribut: string, operator?: string, nilai?: string): TThis
    dariTabel<TThis>(this: TThis, tabel: string): TThis
    danDimana<TThis>(this: TThis, atribut: string, operator?: string, nilai?: string): TThis
    atauDimana<TThis>(this: TThis, atribut: string, operator?: string, nilai?: string): TThis
    adaDi<TThis>(this: TThis, val: Array<string>): TThis
    tidakAdaDi<TThis>(this: TThis, val: Array<string>): TThis
    diantara<TThis>(this: TThis, val: string | number): TThis
    tidakAdaDiantara<TThis>(this: TThis, val: string | number): TThis
    dan<TThis>(this: TThis, val: string | number): TThis
    urutBerdasarkan<TThis>(this: TThis, atribut: string): TThis
    dapatPertama(): Promise<HasilQuery>
    dataPertama(): Promise<HasilQuery>
    semuaData(): Promise<HasilQuery>
    
}

interface Statement extends Operator {
    pilihAtribut<TThis>(this: TThis, atribut: string): Omit<TThis, 'pilihAtribut'>
    hapusDariTabel<TThis>(this: TThis, tabel: string): Omit<TThis, 'hapusDariTabel'>
    KueriMentah<TThis>(this: TThis, kueri: string): Omit<TThis, 'KueriMentah'>
}

export {
    Statement,
    Operator
}