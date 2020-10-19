import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../../../openDB';

export default async function getPersonById(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const db = await openDB();

	if (req.method === 'PUT') {
		const result = await db.run(
			'update person set name = ?, email = ? where id = ?',
			req.body.name,
			req.body.email,
			req.query.id
		);

		console.log(result);
	}

	const person = await db.get(
		'select id, name, email from person where id = ?',
		[req.query.id]
	);

	res.status(200).json(person);
}
