import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admin' })
export class Admin extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255 })
	username: string;

	@Column({ type: 'varchar', length: 255 })
	password: string;

	@CreateDateColumn()
	createdAt: Date;
}
