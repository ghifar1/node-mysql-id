const kondisi = {
    sama_dengan: (val: string) => {
        return `= '${val}'`
    },
    lebih_besar_dari: (val: number) => {
        return `> ${val}`
    },
    lebih_besar_dari_sama_dengan: (val: number) => {
        return `>= ${val}`
    },
    lebih_kecil_dari: (val: number) => {
        return `< ${val}`
    },
    lebih_kecil_dari_sama_dengan: (val: number) => {
        return `<= ${val}`
    },
    tidak_sama_dengan: (val: number) => {
        return `!= ${val}`
    },
    seperti: (val: string) => {
        return `LIKE '${val}'`
    },
}

export {
    kondisi
}