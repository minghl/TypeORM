// 支持直接引用装饰器
import { Like, MoreThanOrEqual, createConnection } from 'typeorm';
import 'reflect-metadata';
import { User } from './entity/User';
import { Comment } from './entity/Comment';

// 连接数据库
createConnection({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username:'root',
    password:'',
    database:'TypeORM',
    // 引入实体
    entities:[
        __dirname + '/entity/*.ts',
    ],
    // 自动创建表格，开发阶段用，上现阶段不能用
    synchronize: true,
}).then( async (connection) => {

    const userRepository =  connection.getRepository(User);
    const commentRepository = connection.getRepository(Comment);
    // 插入用户
    // const user1 = new User();
    // user1.nick = '柯南';
    // user1.salary  = 50000;
    // // 返回promise对象所以用await
    // await userRepository.save(user1);

    // 查找
    // const users = await userRepository.find({
    //     where:
    //     // 数组表示并列
    //     // [
    //     //     {salary: MoreThanOrEqual(50000)},
    //     //     {nick: '柯南'}
    //     // ]
        
    //     // 简单搜索
    //     {
    //         nick: Like("%%"),
    //     },
    //     order: {
    //         salary: 'DESC',
    //         id: 'ASC',
    //     },
    //     // 跳过第一列两个用户
    //     skip: 1,
    //     // 第二页开始
    //     take: 5,
    // });

    // const users = await userRepository.findOne({
    //     nick: '张三',
    // });
    // console.log(users);

    // 删除
    // const user = await userRepository.findOne(1);
    // user.salary = 9999;
    // await userRepository.remove(user);
    
    // 
    const comments = await commentRepository.find({
        relations: ['user'],
    });
    console.log(comments);
    
    const users = await userRepository.find({
        relations: ['comments'],
    })
    console.log(users);
    

    // 用完数据库断掉链接
    connection.close();
});