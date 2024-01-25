import { NextFunction, Request, Response } from 'express';
import { unauthorizedLog } from './log';
import { sign, verify } from 'jsonwebtoken';

export const generateToken = (user: any) =>
	sign(user, process.env.SESSION_SECRET, { expiresIn: '1h' });

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	const header = req.headers['authorization'];
	const token = header && header.split(' ')[1];
	if (!token) return res.sendStatus(401);

	verify(token, process.env.SESSION_SECRET, (err, payload) => {
		if (err) {
			unauthorizedLog(req, res);
			return res.sendStatus(403);
		}

		req.body.payload = payload;
		next();
	});
};

/*
try 
{
	const payload = verify(token, process.env.SESSION_SECRET);
	req.body.payload = payload;
	next();
} catch (err) {
	unauthorizedLog(req, res);
}
*/
