import routes from '..';
import { Admin } from '../../../db/entities/Admin';
import userAgent from '../../../utils/userAgent';
import { consoleLog, unauthorizedLog } from '../../../utils/log';
import { generateToken } from '../../../utils/token';

interface ILoginData {
	username: string;
	password: string;
}

routes.post('/adminLogin', async (req, res) => {
	const { username, password }: ILoginData = req.body;

	const hasEntry = await Admin.countBy({ username, password });

	if (!hasEntry || hasEntry === 0) return unauthorizedLog(req, res);

	const { ip, os, device } = userAgent(req);

	consoleLog('ADMIN_LOGIN', `from ${ip} (${os} - ${device})`);

	const token = generateToken({ username, password });

	res.cookie('token', token, { httpOnly: true, maxAge: 60 * 5 * 1000 })
		.status(200)
		.json({ token });
});
