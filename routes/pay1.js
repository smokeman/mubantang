
exports.pay = function (req, res)
{
    var url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    var appid = 'wx4fe135a46ae46e63';
    var mch_id = '1485431572';
    var notify_url = 'http://221.178.188.234/pay';
    var out_trade_no = '32070583';
    var total_fee = 100;
    var attach = _attach;
    var body = _body;
    var nonce_str = _nonce_str;
    var formData = "<xml>";
    formData += "<appid>"+appid+"</appid>"; //appid
    formData += "<attach>"+attach+"</attach>"; //附加数据
    formData += "<body>"+body+"</body>"; //商品或支付单简要描述
    formData += "<mch_id>"+mch_id+"</mch_id>"; //商户号
    formData += "<nonce_str>"+nonce_str+"</nonce_str>"; //随机字符串，不长于32位
    formData += "<notify_url>"+notify_url+"</notify_url>"; //支付成功后微信服务器通过POST请求通知这个地址
    formData += "<openid></openid>"; //扫码支付这个参数不是必须的
    formData += "<out_trade_no>"+out_trade_no+"</out_trade_no>"; //订单号
    formData += "<spbill_create_ip></spbill_create_ip>"; //不是必须的
    formData += "<total_fee>"+total_fee+"</total_fee>"; //金额
    formData += "<trade_type>NATIVE</trade_type>"; //NATIVE会返回code_url ，JSAPI不会返回
    formData += "<sign>" + paysign(appid,attach,body,out_trade_no,nonce_str,notify_url, '', out_trade_no,'', total_fee, 'NATIVE') + "</sign>";
    formData += "</xml>";
    request(
    {
        url : url,
        method : 'POST',
        body : formData
    }, function (err, response, body)
    {
        if (!err && response.statusCode == 200)
        {
            console.log(body);
            var prepay_id = getXMLNodeValue('prepay_id', body.toString("utf-8"));
            var tmp = prepay_id.split('[');
            var tmp1 = tmp[2].split(']');
            var code_url = getXMLNodeValue('code_url', body.toString("utf-8"));
            var tmp = code_url.split('[');
            var tmp3 = tmp[2].split(']');
            res.render('pay',
            {
                prepay_id : tmp1[0],
                code_url : tmp3[0]
            }
            );
        }
    }
    );
}

function paysign(appid,attach,body,mch_id,nonce_str,notify_url,openid,out_trade_no,spbill_create_ip,total_fee,trade_type) {
    var ret = {
        appid: appid,
        attach: attach,
        body: body,
        mch_id: mch_id,
        nonce_str: nonce_str,
        notify_url:notify_url,
        openid:openid,
        out_trade_no:out_trade_no,
        spbill_create_ip:spbill_create_ip,
        total_fee:total_fee,
        trade_type:trade_type
    };
    var string = raw(ret);
    var key = _key;
    string = string + '&key='+key;  //key为在微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置
    var crypto = require('crypto');
    return crypto.createHash('md5').update(string,'utf8').digest('hex');
};

function raw(args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

