import cors from 'cors';
import express, { Express } from 'express';
import routes from '../routes';
import cookieParser from 'cookie-parser';

export default (app: Express) => {
	app.use(cors());
	app.use(cookieParser());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use('/api', routes);
};
