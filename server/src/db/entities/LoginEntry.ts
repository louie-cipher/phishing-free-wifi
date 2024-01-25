import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'login_entry' })
export class LoginEntry extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255 })
	username: string;

	@Column({ type: 'varchar', length: 255 })
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@Column({ type: 'varchar', length: 32 })
	ip: string;

	@Column({ type: 'varchar', length: 64 })
	browser: string;

	@Column({ type: 'varchar', length: 64 })
	os: string;

	@Column({ type: 'varchar', length: 64 })
	device: string;
}
