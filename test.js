const { kondisi, mysqlId } = require("./index.js");

function coba() {
	mysqlId.hubungkan({
		host: "localhost",
		database: "rtdinda",
		user: "root",
		password: "",
	});

	mysqlId
		.pilihAtribut("*")
		.dariTabel("users")
		.dimana("username", kondisi.seperti('ghifari')).atauDimana("id", kondisi.lebih_kecil_dari(0))
		.semuaData()
		.then(({ hasil, infoField }) => {
			console.log(hasil);
		})
		.catch((err) => {
			console.log(err);
		});

	// mysqlId.KueriMentah('SELECT * FROM users').then(({hasil, infoField})=>{
	//     console.log(hasil)
	// })

	console.log(mysqlId.sequel);
}

coba();
