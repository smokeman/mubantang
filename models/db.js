const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit:10,
    host:'120.77.159.30',
    user:'root',
    password:'w3207058303',
    database:'muban',
    connectTimeout:100//100毫秒,默认是10秒
}); 

// 1)
// exports.query = function (sql,params,callback) {
//     pool.query(sql,params,callback);
// }

// 2) +promise
// exports.query = function (sql,params) {
//     // var promise = new Promise((resolve,reject)=>{
//     //     pool.query(sql,params);
//     // });
//     return new Promise((resolve,reject)=>{
//         pool.query(sql,params,function(error,result,fields) {
//             if(error){
//                 reject(error);
//             }else{
//                 resolve(result,fields);
//             }
//         });
//     });
// }

// 3) + fun=>
// exports.query = (sql,params)=> {
//     return new Promise((resolve,reject)=>{
//         pool.query(sql,params,(error,result,fields)=> {
//             if(error){
//                 reject(error);
//             }else{
//                 resolve(result,fields);
//             }
//         });
//     });
// }

// 4) + fun=> ++
exports.query = (sql,params)=> new Promise((resolve,reject)=>{
    pool.query(sql,params,(error,result,fields)=> {
        if(error){
            // console.log("数据库连接失败,检查数据库是否打开");
            reject(error);
        }else{
            resolve(result,fields);
        }
    });
});
