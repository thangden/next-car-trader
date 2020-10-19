import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { openDB } from '../../openDB';

const authenticated = (fn: NextApiHandler) => async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	verify(req.cookies.auth!, process.env.MY_SECRET as string, async function (
		err,
		decoded
	) {
		if (!err && decoded) {
			return await fn(req, res);
		}

		res.status(401).json({ message: 'Sorry, you are not authenticated' });
	});
};

export default authenticated(async function getPeople(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const db = await openDB();
	const people = await db.all('SELECT id, email, name FROM person');
	res.status(200).json(people);
});
