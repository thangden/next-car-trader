import handler from '../../handler';
import { openDB } from '../../openDB';

export default handler
	.get(async (req, res) => {
		const db = await openDB();
		const drivers = await db.all(`select * from driver order by name asc`);

		res.status(200).json({ userId: req.userId, name: req.username, drivers });
	})
	.post(async (req, res) => {
		if (req.userId !== 1) {
			res.status(401).json({ message: 'Sorry, you are not admin.' });
			return;
		}
		const db = await openDB();
		const {
			lastID,
		} = await db.run(`insert into driver (name, titles) values(?,?)`, [
			req.body.name,
			req.body.titles,
		]);

		res.status(201).json({ ...req.body, id: lastID });
	});
