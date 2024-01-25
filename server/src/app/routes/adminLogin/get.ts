import { verify } from 'jsonwebtoken';
import routes from '..';

routes.get('/adminLogin', async (req, res) => {

	const token = req.cookies['token'];

	if (!token) return res.sendStatus(401);

	try {
		const payload = verify(token, process.env.SESSION_SECRET);
		req.body.payload = payload;
		return res.sendStatus(200);
	} catch (err) {
		console.log('Invalid token');
		return res.sendStatus(401);
	}
});
