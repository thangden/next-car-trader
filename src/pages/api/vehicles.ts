import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';

export default async function getAllVehicles(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		res.status(500).json({ message: 'Only allow GET request' });
	}

	const db = await sqlite.open('./mydb.sqlite');
	const vehicles = await db.all('SELECT * FROM vehicle');

	res.status(200).json(vehicles);
}
