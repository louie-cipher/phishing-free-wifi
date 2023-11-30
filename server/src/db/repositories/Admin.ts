import { Repository } from 'typeorm';
import { Admin } from '../entities/Admin';
import { db } from '..';
import { consoleLog } from '../../utils/log';

class AdminRepository extends Repository<Admin> {
	constructor() {
		super(Admin, db.manager);
	}

	public async defaultAdmin() {
		const hasEntry = await this.countBy({});

		if (hasEntry === 0) {
			const admin = new Admin();
			admin.username = 'password';
			admin.password = 'username';
			await this.save(admin);

			consoleLog('DATABASE', 'Created default admin user');
		}
	}
}

export default new AdminRepository();
