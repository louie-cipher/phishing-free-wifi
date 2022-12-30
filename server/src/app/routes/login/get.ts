import routes from '..';
import { maxLoginAttempts } from '../../..';
import { LoginEntry } from '../../../db/entities/LoginEntry';

routes.get('/login', async (req, res) => {
	const ip = req.socket.remoteAddress || req.ip;

	const entries = await LoginEntry.findBy({ ip });

	res.json({
		exceeded: entries.length > maxLoginAttempts,
	});
});
