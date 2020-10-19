import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export interface NextApiRequestExtended extends NextApiRequest {
	userId: number | null;
	username: string | null;
}

export default nc<NextApiRequestExtended, NextApiResponse>({
	onError(error, req, res) {
		res
			.status(501)
			.json({ error: `Sorry, Somethings went wrong! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method ${req.method} not allowed.` });
	},
}).use((req, res, next) => {
	req.userId = null;
	req.username = null;
	const { authorization } = req.headers;

	if (!authorization) {
		next();
	} else {
		verify(
			authorization,
			process.env.MY_SECRET as string,
			(error: any, decoded: any) => {
				console.log('error', error?.message, decoded);
				if (!error && decoded) {
					req.userId = decoded.sub;
					req.username = decoded.username;
				}
				next();
			}
		);
	}
});
