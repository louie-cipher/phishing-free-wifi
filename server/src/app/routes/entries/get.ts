import routes from '..';
import { AccessEntry } from '../../../db/entities/AccessEntry';
import { LoginEntry } from '../../../db/entities/LoginEntry';
import { validateToken } from '../../../utils/token';

routes.get('/entries', validateToken, async (req, res) => {
	const loginEntries = await LoginEntry.find();
	const accessEntries = await AccessEntry.find();

	res.json({
		loginEntries,
		accessEntries,
	});
});
