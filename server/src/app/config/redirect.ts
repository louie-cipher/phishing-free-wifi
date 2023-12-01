import { Express } from 'express';
import { AccessEntry } from '../../db/entities/AccessEntry';

export default (app: Express) =>
	app.use(async (req, res, next) => {
		const reqHost = req.get('host');
		if (reqHost.includes('facebook.com') || reqHost.includes('192.168.4.1'))
			return next();

		const { ip } = req;

		if (['127.0.0.1', '::1', 'localhost', '192.168.4.1'].includes(ip)) return next();

		AccessEntry.findOneBy({ ip })
			.then((entry) =>
				entry && entry.internetAccess
					? next()
					: res.redirect('http://192.168.4.1:3000')
			)
			.catch(() => res.redirect('http://192.168.4.1:3000'));
	});
