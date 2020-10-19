import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { openDB } from '../../../openDB';

export default async function getVehicleById(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const db = await openDB();
	const vehicle = await db.get('select * from vehicle where id = ?', [
		req.query.id,
	]);

	res.status(200).json(vehicle);
}
