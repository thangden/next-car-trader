import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';
import { openDB } from '../../openDB';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	const db = await openDB();

	if (req.method === 'POST') {
		const person = await db.get('SELECT * FROM person where email = ?', [
			req.body.email,
		]);
		if (!person) {
			res.status(403).json({ message: "Couldn't find your account" });
			return;
		}
		compare(req.body.password, person.password, function (err, result) {
			// result == true
			if (!err && result) {
				const claims = {
					sub: person.id,
					email: person.email,
					username: person.name,
				};
				const jwt = sign(claims, process.env.MY_SECRET as string, {
					expiresIn: '1h',
				});
				res.setHeader(
					'Set-Cookie',
					cookie.serialize('auth', jwt, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						sameSite: 'strict',
						maxAge: 3600,
						path: '/',
					})
				);
				res.status(200).json(person);
			} else {
				res.json({ message: 'Ups, something went wrong!' });
			}
		});
	} else {
		res.status(405).json({ message: 'We only support POST request' });
	}
}
