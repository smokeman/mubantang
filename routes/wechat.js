var express = require('express');  
var router = express.Router();  
var wechat = require('wechat');  
  
var config = {  
  token : 'aoxing',  
  appid : 'wx4fe135a46ae46e63',  
  appsecret :'2e687056f88e92ecc50f2d337d89c4f2',  
  encodingAESKey : 'NiaxaonIJ7nCRNozPXLsJSIWdzE09sRNvSvdxsyDTAR'  
};  
  
router.use(express.query());  
  
router.use('/', wechat(config, function(req, res, next) {  
    console.log(req.weixin);  
    var message = req.weixin;  
    //文本  
    if (message.Content === '1') {  
  
        res.reply('hehe');  
    }  
  
}));  
  
module.exports = router; 