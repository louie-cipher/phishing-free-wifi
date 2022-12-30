import routes from '..';
import { LoginEntry } from '../../../db/entities/LoginEntry';
import { consoleLog } from '../../../utils/log';
import { validateToken } from '../../../utils/token';

routes.delete(`/entries/:id`, validateToken, async (req, res) => {
	const entryId = parseInt(req.params.id, 10);
	if (!entryId) return res.status(400).json({ error: 'Missing entry id' });

	const entry = await LoginEntry.findOneBy({ id: entryId });
	if (!entry) return res.status(404).json({ error: 'Entry not found' });

	await entry.remove();
	consoleLog('DELETE_ENTRY', `Username: ${entry.username} - Password: ${entry.password}`);
	res.status(200).json({ message: 'Entry deleted' });
});
