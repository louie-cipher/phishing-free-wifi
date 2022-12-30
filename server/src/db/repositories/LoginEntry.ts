import { Repository } from 'typeorm';
import { LoginEntry } from '../entities/LoginEntry';
import { db } from '..';
import { maxLoginAttempts } from '../..';

class LoginEntryRepository extends Repository<LoginEntry> {
	constructor() {
		super(LoginEntry, db.manager);
	}

	public async exceededAttempts(ip: string): Promise<boolean> {
		const count = await this.countBy({ ip });
		return count >= maxLoginAttempts;
	}
}

export default new LoginEntryRepository();
