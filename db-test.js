const sqlite = require('sqlite');

async function openDB() {
	const db = await sqlite.open('./mydb.sqlite');
	await db.migrate({ force: 'last' });

	const people = await db.all('SELECT * FROM person');
	console.log('openDB -> people', people);

	const vehicles = await db.all('SELECT * FROM vehicle');
	console.log('openDB -> vehicles', vehicles);
}

openDB();
