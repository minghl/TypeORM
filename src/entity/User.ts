// 一个entity 映射到 一个表格

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";

// 装饰器是一个函数；这里告诉User类映射到了数据库对应得一个表格；装饰器就是提供额外功能
@Entity()
export class User{

    // 修饰字段，主键，自动生成+1
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nick: string;

    @Column()
    salary: number;

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];
}