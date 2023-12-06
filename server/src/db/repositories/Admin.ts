import { Repository } from 'typeorm';
import { Admin } from '../entities/Admin';
import { db } from '..';
import { consoleLog } from '../../utils/log';

export default class AdminRepository extends Repository<Admin> {
	constructor() {
		super(Admin, db.manager);
	}

	public async defaultAdmin() {
		const hasEntry = await this.countBy({});

		if (hasEntry === 0) {
			const admin = new Admin();
			admin.username = process.env.ADMIN_USERNAME || 'admin';
			admin.password = process.env.ADMIN_PASSWORD || 'admin';
			await this.save(admin);

			consoleLog('DATABASE', 'Created default admin user');
		}
	}
}
