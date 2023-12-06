import routes from '..';
import { AccessEntry } from '../../../db/entities/AccessEntry';
import userAgent from '../../../utils/userAgent';

routes.post('/access', async (req, res) => {
	const { ip, browser, os, device } = userAgent(req);

	let entry = await AccessEntry.findOneBy({ ip });

	if (entry) entry.accessCount++;
	else {
		entry = new AccessEntry();
		entry.ip = ip;
		entry.browser = browser;
		entry.os = os;
		entry.device = device;
	}

	await entry.save();
	res.sendStatus(200);
});
