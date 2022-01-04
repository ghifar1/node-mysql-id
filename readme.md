# Mysql Query Builder Bahasa Indonesia

## Instalasi
```console
npm i node-mysql-id
```

## Cara menggunakan
```javascript
const mysql = require("node-mysql-id").mysqlId;

async function test() {
	await mysql.hubungkan({
		host: "localhost",
		database: "nama_database",
		user: "root",
		password: "",
	});

	mysql
		.pilihAtribut("*")
		.dariTabel("users")
		.dimana("email", "=", "ghifari")
		.dapatPertama()
		.then(({ hasil, infoField }) => {
			console.log(hasil);
		});


	mysql
		.pilihAtribut("*")
		.dariTabel("users")
		.semuaData()
		.then(({ hasil, infoField }) => {
			console.log(hasil);
		});

	mysql.KueriMentah("SELECT * FROM users").then(({ hasil, infoField }) => {
		console.log(hasil);
	});
}

test();


```