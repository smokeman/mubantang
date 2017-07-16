
const db = require('./db');

// let users = [];

function Detail(mtype, down, look, img, title, text, rq) {
    this.mtype = mtype;
    this.down = down;
    this.look = look;
    this.img = img;
    this.title = title;
    this.text = text;
    this.rq = rq;
}

// 讲一个包含属性的对象转换为包含User类型
Detail.create = (obj) => {
    if (!obj) {
        return null;
    }
    return new MType(
        obj.mtype,
        obj.down,
        obj.look,
        obj.img,
        obj.title,
        obj.text,
        obj.rq);
};

Detail.get = (mtype,order) => new Promise((resolve, reject) => {
    if(order == undefined) order = 'img';
    var sql = `select mtype, down, look, img, title, text, rq from muban where mtype = '${mtype}' order by ${order} desc`;
    db.query(sql)
        .then((results) => {
            resolve(results);
        })
        .catch((error) => {
            console.log('checkpass err');
        })
})

Detail.getOrder = (mtype,order) => new Promise((resolve, reject) => {
    var sql = `select mtype, down, look, img, title, text, rq from muban where mtype = '${mtype}' order by ${order} desc`;
    db.query(sql)
        .then((results) => {
            resolve(results);
        })
        .catch((error) => {
            console.log('checkpass err');
        })
})

Detail.getAll = (title) => new Promise((resolve,reject)=>{
    var sql = `select mtype, down, look, img, title, text, rq from muban where title like '%${title}%' order by mid `;
    db.query(sql)
        .then((results)=>{
            resolve(results);
        })
        .catch((error)=>{
            console.log('no');
        })
})

Detail.getFrom = (mtype, img) => new Promise((resolve, reject) => {
    if (mtype == 'js') {
        mtype = '网页特效'
    }
    if (mtype == 'php') {
        mtype = 'PHP'
    }
    if (mtype == 'site') {
        mtype = '酷站欣赏'
    }
    if (mtype == 'video') {
        mtype = '视频教程'
    }
    if (mtype == 'template') {
        mtype = '网站模板'
    }
    if (mtype == 'source') {
        mtype = '整站源码'
    }
    var sql = `select mtype, down, look, img, title, text, je from muban where mtype = '${mtype}' and img = ${img} `;
    db.query(sql)
        .then((results) => {
            resolve(results);
        })
        .catch((error) => {
            console.log('checkpass err');
        })
})

// Detail.getFromDetail = (mtype) => new Promise((resolve, reject) => {
//     var sql = `select mtype, down, look, img, title, text, rq from muban where mtype = '${mtype}' and img > 6`;
//     db.query(sql)
//         .then((results) => {
//             resolve(results);
//         })
//         .catch((error) => {
//             console.log('checkpass err');
//         })
// })

module.exports = Detail;
