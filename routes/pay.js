var tenpay = require('tenpay');
var config = {
	appid: 'wx4fe135a46ae46e63',
	mchid: '1485431572',
	partnerKey: 'wanghuaixinwanghuaixinwanghuaixi',
	// pfx: require('fs').readFileSync('证书文件路径'),
	notify_url: 'http://www.aoxing.me/notify',
	spbill_create_ip: '222.186.191.40',
	
}
var api = new tenpay(config);


function pay(){

}

pay.paydo = (trade_no,total_fee,product_id) => new Promise((resolve,reject) => {

	var order = {
		out_trade_no: trade_no,
		body: '模板购买',
		total_fee: total_fee,
		// openid:'opxwxw9i2-AtcYCNqY6YNmu5ugkg',
		trade_type:'NATIVE',
		product_id:product_id
		
	}

	api.unifiedOrder(order)
	.then((result)=>{
		console.log(result);
		resolve(result);
	})
	.catch((err)=>{
		reject(err)
	})

	// api.unifiedOrder(order, function(err,result){
    // 	console.log(result);
	// });

})



module.exports = pay;