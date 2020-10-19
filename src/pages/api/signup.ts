import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import { openDB } from '../../openDB';

export default async function signup(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const db = await openDB();

	if (req.method === 'POST') {
		const person = await db.get('SELECT * FROM person where email = ?', [
			req.body.email,
		]);
		if (person) {
			res
				.status(400)
				.json({ message: 'User with email address already exists' });
		} else {
			hash(req.body.password, 10, async function (err, hash) {
				// Store hash in your password DB.
				const statement = await db.prepare(
					'INSERT INTO person (name, email, password) values (?, ?, ?)'
				);
				const { lastID } = await statement.run(
					req.body.name,
					req.body.email,
					hash
				);

				res.status(201).json({ ...req.body, id: lastID });
			});
		}
	} else {
		res.status(405).json({ message: 'We only support POST request' });
	}
}
