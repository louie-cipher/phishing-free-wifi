import routes from '..';
import { maxLoginAttempts } from '../../../index';
import { LoginEntry } from '../../../db/entities/LoginEntry';
import userAgent from '../../../utils/userAgent';
import { consoleLog } from '../../../utils/log';

interface LoginBody {
	username: string;
	password: string;
}

routes.post('/login', async (req, res) => {
	const { username, password }: LoginBody = req.body;

	if (!username || !password)
		return res.status(400).json({ error: 'Missing username or password' });

	if (password.length < 8)
		return res.status(400).json({ error: 'Password must be at least 8 characters long' });

	const { ip, browser, os, device } = userAgent(req);

	consoleLog('LOGIN', `From: ${ip}\n\tUsername: ${username}\n\tPassword: ${password}`);

	const entriesCount = await LoginEntry.countBy({ ip });

	if (entriesCount >= maxLoginAttempts)
		return res.status(429).json({ error: 'Too many login attempts' });

	const entry = new LoginEntry();
	entry.username = username;
	entry.password = password;
	entry.ip = ip;
	entry.browser = browser;
	entry.os = os;
	entry.device = device;
	await entry.save();

	return res.status(401).json({ error: 'Invalid username or password' });
});
