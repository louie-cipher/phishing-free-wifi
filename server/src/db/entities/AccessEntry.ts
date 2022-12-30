import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'access_entry' })
export class AccessEntry extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	count: number;

	@CreateDateColumn()
	firstAccess: Date;

	@UpdateDateColumn()
	lastAccess: Date;

	@Column({ type: 'varchar', length: 64 })
	ip: string;

	@Column({ type: 'varchar', length: 64 })
	browser: string;

	@Column({ type: 'varchar', length: 64 })
	os: string;

	@Column({ type: 'varchar', length: 64 })
	device: string;
}
