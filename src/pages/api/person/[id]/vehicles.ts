import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';

export default async function getAllVehiclesByPersonId(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const db = await sqlite.open('./mydb.sqlite');
	const allVehicles = await db.all('SELECT * FROM vehicle where ownerId = ?', [
		req.query.id,
	]);

	res.status(200).json(allVehicles);
}
