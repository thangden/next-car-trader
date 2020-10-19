const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

(async () => {
	const db = await sqlite.open({
		filename: './db.sqlite',
		driver: sqlite3.Database,
	});

	await db.migrate({ force: true });
	const drivers = await db.all('select * from driver');
	console.log('drivers', drivers);
})();
