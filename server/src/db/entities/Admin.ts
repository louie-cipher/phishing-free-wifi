import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'admin' })
export class Admin extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 64 })
	username: string;

	@Column({ type: 'varchar', length: 64 })
	password: string;

	@CreateDateColumn()
	createdAt: Date;
}
