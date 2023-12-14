import { config } from 'dotenv';
import app from './app';
import { consoleError, consoleLog } from './utils/log';
import { initDB } from './db';

export const maxLoginAttempts = 5;

config({ path: '../.env' });

export const host = process.env.HOST || 'localhost';
export const port = parseInt(process.env.PORT || '5000', 10);
export const frontendHost = process.env.VITE_HOST || host;
export const frontendPort = parseInt(process.env.VITE_PORT || '80', 10);

const server = app.listen(port, () =>
	consoleLog('SERVER', `Server running at http://${host}:${port}`)
);

initDB();

process
	.on('SIGINT', () => server.close())
	.on('SIGTERM', () => server.close())
	.on('unhandledRejection', (err) => consoleError('UNHANDLED_REJECTION', err))
	.on('uncaughtException', (err, origin) =>
		consoleError('UNCAUGHT_EXCEPTION', `origin: ${origin}`, err)
	);
