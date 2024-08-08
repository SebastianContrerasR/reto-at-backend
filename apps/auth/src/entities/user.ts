import { hash } from "bcrypt";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, Unique } from "typeorm";
@Entity('users')
@Unique(['email'])
export class User {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}