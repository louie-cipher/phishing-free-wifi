import { DataSource } from 'typeorm';
import { consoleLog } from '../utils/log';

const entities = `${__dirname}/entities/*.{ts,js}`;

export const db = new DataSource({
	type: 'sqlite',
	database: '../database.sqlite',
	entities: [entities],
	synchronize: true,
});

import './repositories/LoginEntry';
import AdminRepo from './repositories/Admin';

export const initDB = async () => {
	db.initialize()
		.then(() => {
			consoleLog('DATABASE', 'Connected to database');
			AdminRepo.defaultAdmin();
		})
		.catch((err) => consoleLog('DATABASE', 'Error connecting to database: ', err));
};

/*
{
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	entities: [entities],
	synchronize: true,
}
*/
