import { gray, blue, red } from 'chalk';
import { Request, Response } from 'express';
import { userAgentToString } from '.';

const d = (n: number) => (n < 10 ? `0${n}` : `${n}`);

function dateToString(): string {
	const date = new Date();
	return `${d(date.getHours())}:${d(date.getMinutes())}:${d(date.getSeconds())}`;
}

export const consoleLog = (origin: string, ...args: any[]) =>
	console.log(gray(dateToString()), blue(`[${origin}]`), ...args);

export const consoleError = (origin: string, ...args: any[]) =>
	console.log(gray(dateToString()), red(`[${origin}]`), ...args, '\n', '-'.repeat(80));

export function unauthorizedLog(req: Request, res: Response): void {
	const { ip, os, device } = userAgentToString(req);

	consoleError('BYPASS_ATTEMPT', `Bypass attempt from ${ip} (${os} - ${device})`);
	res.sendStatus(401);
}
