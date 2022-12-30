import { DataSource } from 'typeorm';
import { consoleLog } from '../utils/log';

const entities = `${__dirname}/entities/*.{ts,js}`;

export const db = new DataSource({
	type: 'sqlite',
	database: '../database.sqlite',
	entities: [entities],
	synchronize: true,
});

import AdminRepo from './repositories/Admin';

export const initDB = async () => {
	db.initialize()
		.then(() => {
			consoleLog('DATABASE', 'Connected to database');
			AdminRepo.defaultAdmin();
		})
		.catch((err) => consoleLog('DATABASE', 'Error connecting to database: ', err));
};
