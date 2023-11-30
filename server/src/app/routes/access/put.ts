import routes from '..';
import { AccessEntry } from '../../../db/entities/AccessEntry';
import { validateToken } from '../../../utils/token';

routes.put(`/access/:id`, validateToken, async (req, res) => {
	const entryId = parseInt(req.params.id, 10);
	if (!entryId) return res.status(400).json({ error: 'Missing entry id' });

	const entry = await AccessEntry.findOneBy({ id: entryId });
	if (!entry) return res.status(404).json({ error: 'Entry not found' });

	entry.internetAccess = !entry.internetAccess;
	await entry.save();

	res.status(200).json({ message: 'Entry updated' });
});
