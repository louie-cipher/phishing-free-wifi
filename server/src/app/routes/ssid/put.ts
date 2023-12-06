import { exec } from 'child_process';
import routes from '..';
import { consoleError } from '../../../utils/log';
import { validateToken } from '../../../utils/token';

const validateSSID = (ssid: string) => ssid.match(/^(?! )[A-Za-z0-9_ -]{8,32}$/);

routes.put('/ssid', validateToken, async (req, res) => {
	const newSSID: string = req.body.newSSID;
	if (!newSSID) return res.status(400).json({ error: 'Missing new SSID' });
	if (!validateSSID(newSSID)) return res.status(400).json({ error: 'Invalid SSID' });

	const command = `sed -i 's/ssid=.*/ssid=${newSSID}/g' /etc/hostapd/hostapd.conf`;

	exec(command, (err, stdout, stderr) => {
		if (err) {
			consoleError('SSID', err);
			return res.status(500).json({ error: 'Failed to set new SSID' });
		}

		exec('systemctl restart hostapd', (err, stdout, stderr) => {
			if (err) {
				consoleError('SSID', err);
				return res.status(500).json({ error: 'Failed to restart hostapd' });
			}

			res.sendStatus(200);
		});
	});
});
