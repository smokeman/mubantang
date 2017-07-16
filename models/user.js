/*
* 用户表的CURD
*/

const db = require('./db');

// let users = [];

function User(uid,account,email,password) {
    this.uid = uid;
    this.account = account;
    this.email = email;
    this.password = password;
}       

// 讲一个包含属性的对象转换为包含User类型
User.create = (obj)=>{
    if(!obj){
        return null;
    }
    return new User(
        obj.uid,
        obj.account, 
        obj.email, 
        obj.password);
};


// 通过账户找用户对象
// 1)
// User.getByAccount = function(account) {
//     // TODO
//     db
//     .query(`select password from sys_user where account = '${account}'`)
//     .then((result,fields)=>{
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// };
// 2)promise
// User.updateRole = (account,roleid) => new Promise((resolve,reject)=>{
//     var sql = `update sys_user set role = ${roleid} where account = '${account}';`;
//     db.query(sql)
//     .then((result)=>{
//         resolve(result);
//     })
//     .catch(reject);
// })

// User.checkUser = (usercode)=> new Promise((resolve,reject)=>{
//     var sql = `select uid from sys_user where account = '${usercode}'`;
//     db.query(sql)
//     .then((results)=>{
//         resolve(results.length);
//     })
//     .catch((error)=>{
//         console.log('checkuser err');
//     })
// })

User.checkPass = (account,password)=> new Promise((resolve,reject)=>{
    var sql = `select a.account,a.uname,b.dcode,b.dname,a.role,c.rname from sys_user a,sys_dept b,sys_role c 
    where a.dcode = b.dcode and a.Role = c.RId and a.account = '${usercode}' and a.password = '${password}'`;
    db.query(sql)
    .then((results)=>{
        resolve(results);
    })
    .catch((error)=>{
        console.log('checkpass err');
    })
})


User.getByAccount = (account)=> new Promise((resolve,reject)=>{
    // TODO
    // db 2-1)
    // .query(`select password from sys_user where account = '${account}'`)
    // .then((result,fields)=>{ //fields可以省略
    //     resolve(result);
    // })
    // .catch((error) => {
    //     reject(error);
    // });
    db // 2-2) //此处有一个大小写坑，如果把account改成Account,会undefined
    .query(`select uid,account, email, password from user where account = '${account}'`)
    // .then(resolve)
    .then((result)=>{
        console.log(result);
        // resolve(result[0]) 因为是RowDataPacket,需返回User对象
        var user = User.create(result[0]);
        // return user;错误的写法，promis中return是错的,应为下面
        resolve(user);

    })
    .catch(reject);
});

// 获取所有用户
User.get = ()=> new Promise((resolve,reject)=>{
    var sql = `select a.uid,a.account, a.email, a.password from user a`;
    db
    .query(sql)
    .then((result)=>{
        let users = [];
        for(var i=0;i<result.length;i++){
            users.push(User.create(result[i]));
        }
        resolve(users);
    })
    .catch(reject);
})

User.login = (account,pwd) => new Promise((resolve,reject)=>{
    let sql = `select account,email from user where account = '${account}' and password = '${pwd}'`;
    db
    .query(sql)
    .then((result)=>{
        if(result.length == 0){
            resolve({user:'null'});
        }else{
            resolve({user:result[0]});
        }
    })
    .catch(reject);
})

// 插入
User.insert = (accoumt,email,password)=> new Promise((resolve,reject)=>{
    var sql = `insert into user(account,email,password)values('${accoumt}','${email}','${password}')`;
    db
    .query(sql)
    .then((result)=>{
        let users = [];
        for(var i=0;i<result.length;i++){
            users.push(User.create(result[i]));
        }
        resolve(users);
    })
    .catch(reject);
})

// User.getByCK = (ck_dcode)=> new Promise((resolve,reject)=>{
//     db
//     .query(`select  a.uid,a.account, a.uname, a.password, a.sex, a.role, a.did, a.createtime from sys_user a,tm_user_ck_dept b,tm_ck_dept c WHERE b.ck_dcode = ${ck_dcode} and a.account = b.account and b.CK_DCode = c.CK_DCode`)
//     .then((result)=>{
//         let users = [];
//         for(var i=0;i<result.length;i++){
//             users.push(User.create(result[i]));
//         }
//         resolve(users);
//     })
//     .catch(reject);
// })

// 获取考核委员会管理员或科室管理员
// User.getByRoleId = (rodeid)=> new Promise((resolve,reject)=>{
//     var sql = `select a.uid,a.account, a.uname, a.password, a.sex, a.role, a.did, a.createtime,b.dname from sys_user a,sys_dept b WHERE a.dcode = b.dcode and a.role = ${rodeid}`;
//     db
//     .query(sql)
//     .then((result)=>{
//         let users = [];
//         for(var i=0;i<result.length;i++){
//             users.push(User.create(result[i]));
//         }
//         resolve(users);
//     })
//     .catch(reject);
// })

// 删除用户根据uid
// User.del = (uid)=> new Promise((resolve,reject)=>{
//     db
//     .query(`delete from sys_user where uid = ${uid};`)
//     .then(()=>{
//         db.query(`select uid,account,uname,password,sex,role,did,createtime from sys_user; `)
//         .then((result)=>{
//             let users = [];
//             for(var i=0;i<result.length;i++){
//                 users.push(User.create(result[i]));
//             }
//             resolve(users);
//         });
//     })
//     .catch(reject);
// });

User.prototype.save = function(){
    // TODO:save
};

module.exports = User;