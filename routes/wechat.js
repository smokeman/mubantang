var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var wechatApi = require('wechat-api');

var menu = {
    "button": [
        {
            "type": "click",
            "name": "今日歌曲",
            "key": "V1001_TODAY_MUSIC"
        },
        {
            "name": "菜单",
            "sub_button": [
                {
                    "type": "view",
                    "name": "搜索",
                    "url": "http://www.soso.com/"
                },
                {
                    "type": "miniprogram",
                    "name": "wxa",
                    "url": "http://mp.weixin.qq.com",
                    "appid": "wx286b93c14bbf93aa",
                    "pagepath": "pages/lunar/index"
                },
                {
                    "type": "click",
                    "name": "赞一下我们",
                    "key": "V1001_GOOD"
                }]
        }]
}

var config = {
    token: 'aoxing',
    appid: 'wx4fe135a46ae46e63',
    appsecret: '2e687056f88e92ecc50f2d337d89c4f2',
    encodingAESKey: 'NiaxaonIJ7nCRNozPXLsJSIWdzE09sRNvSvdxsyDTAR'
};

var api = new wechatApi(config.appid, config.appsecret);

// var menu = {
//   "button": [
//     {
//       "type": "click",
//       "name": "优惠活动",
//       "key": "V1001_TODAY_MUSIC"
//     },
//     {
//       "name": "BotFramework",
//       "sub_button": [
//         {
//           "type": "view",
//           "name": "botframework",
//           "url": "https://dev.botframework.com/"
//         },
//         {
//           "type": "click",
//           "name": "赞一下我们",
//           "key": "V1001_GOOD"
//         }, {
//           "name": "发送位置",
//           "type": "location_select",
//           "key": "rselfmenu_2_0"
//         },]
//     }]
// };
// var menu = {
//   "button": [
//     {
//         "name":"优惠活动",
//         "sub_button":[
//             {
//                 "type":"view",
//                 "name":"附近活动"
//             },
//             {
//                 "type":"view",
//                 "name":"优惠券"
//             }
//         ]
//     },
//     {
//       "name": "商家合作",
//       "sub_button": [
//         {
//           "type": "view",
//           "name": "酒吧入口",
//           "url": "http://www.aoxing.me/lunpan/index.html"
//         },
//         {
//           "type": "view",
//           "name": "联系我们",
//           "url": "http://www.aoxing.me/lunpan/index.html"
//         }]
//     }]
// };
//删除菜单
// api.removeMenu(function (err, result) {
//   if (err) {
// logger.log('error', err);
//   }
//   logger.log('info', 'remove menu success');
// });

//创建菜单
// api.createMenu(menu, function (err, result) {
//   if (err) {
// logger.log('error', err);
//   }
//   logger.log('info', 'create menu success');
// });



router.use(express.query());

router.use('/', wechat(config, function (req, res, next) {
    console.log(req.weixin);
    var message = req.weixin;
    //文本  
    var menu = {
        "button": [
            {
                "name": "优惠活动",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "附近活动",
                        "url": "https://dev.botframework.com/"
                    },
                    {
                        "type": "view",
                        "name": "优惠券",
                        "url": "https://dev.botframework.com/"
                    }
                ]
            },
            {
                "name": "商家合作",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "商家入口",
                        "url": "https://dev.botframework.com/"
                    },
                    {
                        "type": "click",
                        "name": "关于我们",
                        "key": "V1001_GOOD"
                    }, {
                        "name": "发送位置",
                        "type": "location_select",
                        "key": "rselfmenu_2_0"
                    },]
            }]
    };

    if (message.Content === '1') {
        // api.createMenu(menu);
        api.createMenu(menu, function (err, result) {
            if (err) {
                // logger.log('error', err);
                console.log(err)
            } else {
                console.log('create menu success');
                res.reply('');
            }

            // logger.log('info', 'create menu success');
        });
        // res.reply([
        //     {
        //         title: '你来我家接我吧',
        //         description: '这是女神与高富帅之间的对话',
        //         picurl: 'http://pic49.nipic.com/file/20140927/19617624_230415502002_2.jpg',
        //         url: 'http://www.aoxing.me/php'
        //     }
        // ]);


    }
    if (message.Content === '2') {
        api.removeMenu();
    }

})


);

module.exports = router;


// var menu = {
//   "button": [
//     {
//       "type": "click",
//       "name": "按钮1",
//       "key": "V1001_TODAY_MUSIC"
//     },
//     {
//         "name":"优惠活动",
//         "sub_button":[
//             {
//                 "type":"view",
//                 "name":"附近活动"
//             },
//             {
//                 "type":"view",
//                 "name":"优惠券"
//             }
//         ]
//     },
//     {
//       "name": "后台",
//       "sub_button": [
//         {
//           "type": "view",
//           "name": "登陆管理",
//           "url": "http://www.aoxing.me/lunpan/index.html"
//         },
//         {
//           "type": "click",
//           "name": "赞一下我们",
//           "key": "V1001_GOOD"
//         }, {
//           "name": "发送位置",
//           "type": "location_select",
//           "key": "rselfmenu_2_0"
//         },]
//     }]
// };