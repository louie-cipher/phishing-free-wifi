import routes from '..';
import { AccessEntry } from '../../../db/entities/AccessEntry';
import { userAgentToString } from '../../../utils';

routes.post('/access', async (req, res) => {
	const { ip, browser, os, device } = userAgentToString(req);

	let entry = await AccessEntry.findOneBy({ ip });

	if (entry) entry.count++;
	else {
		entry = new AccessEntry();
		entry.ip = ip;
		entry.browser = browser;
		entry.os = os;
		entry.device = device;
		entry.count = 1;
	}

	await entry.save();
	res.sendStatus(200);
});
