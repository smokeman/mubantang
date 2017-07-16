const db = require('./db');

// let users = [];

function MType(tcode,tname) {
    this.tcode = tcode;
    this.tname = tname;
}       

// 讲一个包含属性的对象转换为包含User类型
MType.create = (obj)=>{
    if(!obj){
        return null;
    }
    return new MType(
        obj.tcode,
        obj.tname);
};

MType.getTypeFrom = (tcode)=> new Promise((resolve,reject)=>{
    var sql = `select right(left(tcode,4),2) as stype ,tcode,tname from mtype where tcode like '${tcode}%' and length(tcode) > 4`;
    db.query(sql)
    .then((results)=>{
        resolve(results);
    })
    .catch((error)=>{
        console.log('checkpass err');
    })
})

module.exports = MType;