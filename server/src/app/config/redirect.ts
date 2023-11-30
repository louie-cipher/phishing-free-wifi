import { Express } from 'express';
import { AccessEntry } from 'db/entities/AccessEntry';

const hostname = 'facebook.com';

export default (app: Express) =>
	app.use((req, res, next) => {
		if (req.get('host').includes(hostname)) return next();

		const { ip } = req;

		AccessEntry.findOneBy({ ip })
			.then((entry) =>
				entry && entry.internetAccess
					? next()
					: res.redirect(`http://${hostname}`)
			)
			.catch(() => res.redirect(`http://${hostname}`));
	});
