import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BeforeInsert, AfterInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
export enum Role {
    ADMIN = 'admin',
    USER = 'users',
    MANAGER = 'manager',
  }

@Entity()
export class DB_userinfo  {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({generated:('uuid') , unique:true})
    uuid:string;

    @Column({unique:true , nullable:false})
    email:string

    @Column({nullable:false})
    password:string

    @Column({unique:true , nullable:false , length:10})
    phone: string;

    @Column({
        type:'enum',
        enum:Role,
        default:Role.USER,

    })
    role:Role;


    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    @BeforeUpdate()
    async updatePassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
}