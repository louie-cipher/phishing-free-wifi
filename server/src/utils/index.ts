import { Request } from 'express';
import UAParser from 'ua-parser-js';

export function userAgentToString(req: Request) {
	const parser = UAParser(req.headers['user-agent']);

	let browser = '';
	let os = '';
	let device = '';

	for (const key in parser.browser) if (parser.browser[key]) browser += `${parser.browser[key]} `;
	for (const key in parser.os) if (parser.os[key]) os += `${parser.os[key]} `;
	for (const key in parser.device) if (parser.device[key]) device += ` ${parser.device[key]} `;

	if (browser.endsWith(' ')) browser = browser.slice(0, -1);
	if (os.endsWith(' ')) os = os.slice(0, -1);
	if (device.endsWith(' ')) device = device.slice(0, -1);

	if (device === '' || device === ' ') device = 'Desktop';

	return {
		ip: req.socket.remoteAddress || req.ip,
		browser: browser.substring(0, 255),
		os: os.substring(0, 255),
		device: device.substring(0, 255),
	};
}
