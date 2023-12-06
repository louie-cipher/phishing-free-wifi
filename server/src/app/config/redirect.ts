import { Express } from 'express';
import { AccessEntry } from '../../db/entities/AccessEntry';
import { host, port, frontendHost, frontendPort } from '../../';

export default (app: Express) =>
	app.use(async (req, res, next) => {
		const { ip } = req;

		if (['127.0.0.1', '::1', 'localhost'].includes(ip)) return next();
		
		const reqHost = req.get('host');
		if (reqHost.includes(host) || reqHost.includes(frontendHost)) return next();

		AccessEntry.findOneBy({ ip })
			.then((entry) =>
				entry && entry.internetAccess
					? next()
					: res.redirect(`http://${frontendHost}:${frontendPort}`)
			)
			.catch(() => res.redirect(`http://${frontendHost}:${frontendPort}`));
	});
