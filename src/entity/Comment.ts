import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    // 定义关系
    @ManyToOne(type => User)
    // 连接外键
    @JoinColumn()
    user: User;
}