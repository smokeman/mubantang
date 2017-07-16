var tenpay = require('tenpay');
var config = {
	appid: 'wx4fe135a46ae46e63',
	mchid: '1485431572',
	partnerKey: '6b83cf5a1afbb79ba482c176c33d5f3f',
	// pfx: require('fs').readFileSync('证书文件路径'),
	notify_url: '222.186.191.40',
	spbill_create_ip: '222.186.191.40'
}
var api = new tenpay(config);

var order = {
	out_trade_no: '1010101010101',
	body: 'test',
	total_fee: 100,
    openid:'opxwxw9i2-AtcYCNqY6YNmu5ugkg'
}
api.unifiedOrder(order, function(err,result){
    console.log(err);
});
