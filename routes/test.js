var pay = require('./pay');

pay.paydo('20172321312',1,'23131232112')
.then((result)=>{
    console.log(result)
});