import { readdirSync } from 'fs';

export default () =>
	readdirSync(__dirname)
		.filter((file) => !file.includes('.'))
		.forEach((directory) => {
			readdirSync(`${__dirname}/${directory}`).forEach(
				(file) => import(`./${directory}/${file}`)
			);
		});
