import { gray, blue, red } from 'chalk';
import { Request, Response } from 'express';
import userAgent from './userAgent';

const nowString = () =>
	new Date().toLocaleTimeString('pt-BR', {
		timeZone: 'America/Sao_Paulo',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});

export const consoleLog = (origin: string, ...args: any[]) =>
	console.log(gray(nowString()), blue(`[${origin}]`), ...args);

export const consoleError = (origin: string, ...args: any[]) =>
	console.log(gray(nowString()), red(`[${origin}]`), ...args, '\n', '-'.repeat(80));

export function unauthorizedLog(req: Request, res: Response): void {
	const { ip, os, device } = userAgent(req);

	consoleError('BYPASS_ATTEMPT', `Bypass attempt from ${ip} (${os} - ${device})`);
	res.sendStatus(401);
}
