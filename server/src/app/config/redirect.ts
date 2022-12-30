import { Express } from 'express';
import { verify } from 'jsonwebtoken';

const hostname = process.env.HOST || 'facebook.com';

export default (app: Express) =>
	app.use((req, res, next) => {
		if (req.get('host') === hostname) return next();

		const token = req.cookies.token;
		if (!token) return res.redirect(`http://${hostname}`);

		try {
			const result = verify(token, process.env.SESSION_SECRET);
			if (result) return next();
		} catch (err) {
			res.redirect(`http://${hostname}`);
		}
	});
