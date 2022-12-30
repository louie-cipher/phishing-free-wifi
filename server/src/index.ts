import { config } from 'dotenv';
import app from './app';
import { consoleError, consoleLog } from './utils/log';
import { initDB } from './db';

export const maxLoginAttempts = 5;

config({ path: '../.env' });

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
	consoleLog('SERVER', `Server running at http://localhost:${port}`)
);

initDB();

process
	.on('SIGINT', () => server.close())
	.on('SIGTERM', () => server.close())
	.on('unhandledRejection', (err) => consoleError('UNHANDLED_REJECTION', err))
	.on('uncaughtException', (err, origin) =>
		consoleError('UNCAUGHT_EXCEPTION', `origin: ${origin}`, err)
	);
