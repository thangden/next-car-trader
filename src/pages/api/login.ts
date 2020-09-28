import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	const db = await sqlite.open('./mydb.sqlite');

	if (req.method === 'POST') {
		const person = await db.get('SELECT * FROM person where email = ?', [
			req.body.email,
		]);
		if (!person) {
			res.status(404).json({ message: "Couldn't find your account" });
			return;
		}
		compare(req.body.password, person.password, function (err, result) {
			// result == true
			if (!err && result) {
				const claims = { sub: person.id, email: person.email };
				const jwt = sign(claims, process.env.SECRET as string, {
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
				res.status(200).json({ message: 'Welcome back!' });
			} else {
				res.json({ message: 'Ups, something went wrong!' });
			}
		});
	} else {
		res.status(405).json({ message: 'We only support POST request' });
	}
}
