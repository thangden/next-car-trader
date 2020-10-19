import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../../../openDB';

export default async function getAllVehiclesByPersonId(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const db = await openDB();
	const allVehicles = await db.all(
		'select id, brand, model from vehicle where ownerId = ?',
		[req.query.id]
	);

	res.status(200).json(allVehicles);
}
