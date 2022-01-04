const mysqlId = require('./index.js').mysqlId;

async function coba()
{
    await mysqlId.hubungkan({
        host: 'localhost',
        database: 'rtdinda',
        user: 'root',
        password: ''
    
    })
    
    // mysqlId.pilihAtribut('username, password').dariTabel('users').dimana("username", "=", "ghifari").semuaData().then(({hasil, infoField})=>{
    //     console.log(hasil)
    // }).catch(err=>{
    //     console.log(err)
    // })

    mysqlId.KueriMentah('SELECT * FROM users').then(({hasil, infoField})=>{
        console.log(hasil)
    })

    console.log(mysqlId.sequel)
}

coba()
