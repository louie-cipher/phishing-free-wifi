import { Express } from 'express';
import { AccessEntry } from '../../db/entities/AccessEntry';

const hostname = 'facebook.com';

export default (app: Express) =>
	app.use(async (req, res, next) => {
		if (req.get('host').includes(hostname)) return next();

		const { ip } = req;

		if (['127.0.0.1', '::1', 'localhost', '192.168.4.1'].includes(ip)) return next();

		AccessEntry.findOneBy({ ip })
			.then((entry) =>
				entry && entry.internetAccess
					? next()
					: res.redirect(`http://${hostname}`)
			)
			.catch(() => res.redirect(`http://${hostname}`));
	});
