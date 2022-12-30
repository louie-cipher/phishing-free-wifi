import { Repository } from 'typeorm';
import { AccessEntry } from '../entities/AccessEntry';
import { db } from '..';

class AccessEntryRepository extends Repository<AccessEntry> {
	constructor() {
		super(AccessEntry, db.manager);
	}
}

export default new AccessEntryRepository();
