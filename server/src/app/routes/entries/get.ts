import routes from '..';
import { AccessEntry } from '../../../db/entities/AccessEntry';
import { LoginEntry } from '../../../db/entities/LoginEntry';
import { consoleLog } from '../../../utils/log';
import { validateToken } from '../../../utils/token';

routes.get('/entries', async (req, res) => {
	const loginEntries = await LoginEntry.find({});
	const accessEntries = await AccessEntry.find({});

	consoleLog('DEBUG', loginEntries);
	consoleLog('DEBUG', accessEntries);

	if (!loginEntries && !accessEntries) return res.sendStatus(404);

	res.json({
		loginEntries,
		accessEntries,
	});
});
