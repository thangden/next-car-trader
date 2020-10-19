import handler from '../../handler';
import { openDB } from '../../openDB';

export default handler
	.get(async (req, res) => {
		const db = await openDB();
		const champions = await db.all(
			`select * from driver where titles > 0 order by titles desc, name asc`
		);

		res.status(200).json(champions);
	})
	.post((req, res) => {
		throw new Error('POST error.');
	});
