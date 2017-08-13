// HEAD
var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var type = require('../models/type.js');
var detail = require('../models/detail.js');
var bodyParser = require("body-parser");
var pay = require('./pay.js');

var url = require("url");
var crypto = require("crypto");
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index.html', {value:1});
// });


function sha1(str) {
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

router.get('/weixin',function(req,res){
    var query = url.parse(req.url,true).query;
  //console.log("*** URL:" + req.url);
  //console.log(query);
  var signature = query.signature;
  var echostr = query.echostr;
  var timestamp = query['timestamp'];
  var nonce = query.nonce;
  var oriArray = new Array();
  oriArray[0] = nonce;
  oriArray[1] = timestamp;
  oriArray[2] = "aoxing";//这里是你在微信开发者中心页面里填的token，而不是****
  oriArray.sort();
  var original = oriArray.join('');
  console.log("Original str : " + original);
  console.log("Signature : " + signature );
  var scyptoString = sha1(original);
  if(signature == scyptoString){
    res.end(echostr);
    console.log("Confirm and send echo back");
  }else {
    res.end("false");
    console.log("Failed!");
  }
})


router.get('/notify', function (req, res, next) {
  console.log('notifygetfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
})

router.post('/notify', function (req, res, next) {
  var postData = '';
  req.on('data', chunk => postData += chunk.toString());
  req.on('end', () => {
    console.log(postData);
    console.log('notifypostfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    let return_code = `<xml>
  <return_code><![CDATA[SUCCESS]]></return_code>
  <return_msg><![CDATA[OK]]></return_msg>
</xml>`
    res.send(return_code)  
  })
})


router.get('/order', function (req, res, next) {
  let _type = req.query.type;
  let _route = req.query.route;

})

router.get('/临时关闭', function (req, res, next) {
  const getPromises =
    ['网站模板', '网页特效', 'PHP', '视频教程', '酷站欣赏', '整站源码'].map(par => detail.get(par));

  Promise.all(getPromises)
    .then(([template, js, php, video, site, source]) =>
      res.render('index.html', { template, js, php, video, site, source, current: 'index', account: res.cookie['account'], email: res.cookie['email'] })
    )

  // detail.get('网站模板')
  //   .then((result) => {
  //     let template = result;
  //     detail.get('网页特效')
  //       .then((result) => {
  //         let js = result;
  //         detail.get('PHP')
  //           .then((result) => {
  //             let php = result;
  //             detail.get('视频教程')
  //               .then((result) => {
  //                 let video = result;
  //                 detail.get('酷站欣赏')
  //                   .then((result) => {
  //                     let site = result;
  //                     detail.get('整站源码')
  //                       .then((result) => {
  //                         let source = result;
  //                         res.render('index.html', {
  //                           current: 'index',
  //                           template: template,
  //                           js: js,
  //                           php: php,
  //                           video: video,
  //                           site: site,
  //                           source: source
  //                         });
  //                       })
  //                   })
  //               })

  //           })
  //       })

  //     // return result;
  //   })

});

router.get('/search', function (req, res, next) {
  let txt = req.query.txt;
  detail.getAll(txt)
    .then((results) => {
      console.log(results.length);
      if (!results) {
        console.log('null')
      } else {

        res.render('search.html', { search: results, account: res.cookie['account'], email: res.cookie['email'] });
      }

    })

})

router.get('/js', function (req, res, next) {
  type.getTypeFrom('01')
    .then((result) => {
      let type = result;
      detail.get('网页特效', req.query.type)
        .then((result) => {
          res.render('js.html', { rule: req.query.type == undefined ? '' : req.query.type, route: 'js', type: type, current: 'js', js: result, account: res.cookie['account'], email: res.cookie['email'] });
        })

    })
});

router.get('/php', function (req, res, next) {

  type.getTypeFrom('02')
    .then((result) => {
      let type = result;

      detail.get('PHP', req.query.type)
        .then((result) => {
          res.render('php.html', { rule:req.query.type == undefined?'':req.query.type,route: 'php', type: type, current: 'php', php: result, account: res.cookie['account'], email: res.cookie['email'] });
        })

    })
});

router.get('/templates', function (req, res, next) {
  type.getTypeFrom('03')
    .then((result) => {
      let type = result;
      detail.get('网站模板', req.query.type)
        .then((result) => {
          res.render('templates.html', { rule:req.query.type == undefined?'':req.query.type,route: 'templates', type: type, current: 'templates', template: result, account: res.cookie['account'], email: res.cookie['email'] });
        })

    })
});

router.get('/video', function (req, res, next) {
  type.getTypeFrom('04')
    .then((result) => {
      let type = result;
      detail.get('视频教程', req.query.type)
        .then((result) => {
          res.render('video.html', { rule:req.query.type == undefined?'':req.query.type,route: 'video', type: type, current: 'video', video: result, account: res.cookie['account'], email: res.cookie['email'] });
        })

    })
});

router.get('/site', function (req, res, next) {
  type.getTypeFrom('05')
    .then((result) => {
      let type = result;
      detail.get('酷站欣赏', req.query.type)
        .then((result) => {
          res.render('site.html', { rule:req.query.type == undefined?'':req.query.type,video: 'site', type: type, current: 'site', site: result, account: res.cookie['account'], email: res.cookie['email'] });
        })

    })
});

router.get('/source', function (req, res, next) {
  type.getTypeFrom('06')
    .then((result) => {
      let type = result;
      detail.get('整站源码', req.query.type)
        .then((result) => {
          res.render('source.html', { rule:req.query.type == undefined?'':req.query.type,route: 'source', type: type, current: 'source', source: result, account: res.cookie['account'], email: res.cookie['email'] });
        })

    })
});

router.get('/contact', function (req, res, next) {
  res.render('contact.html', { value: 1, account: res.cookie['account'], email: res.cookie['email'] });
});

router.get('/login', function (req, res, next) {
  res.render('login.html', { value: 1 });
});

router.get('/pay', function (req, res, next) {
  res.render('pay.html', { value: 1, account: res.cookie['account'], email: res.cookie['email'] });
});

router.post('/paydetail', function (req, res, next) {
  var postData = '';
  // console.log(postData.split('&')[0].split['='][1]);
  req.on('data', chunk => postData += chunk.toString());
  req.on('end', () => {
    console.log(postData.split('&')[0].split('=')[1]);
    pay.paydo(Math.random().toString(36).substring(3, 8), postData.split('&')[0].split('=')[1] * 100, Math.random().toString(36).substring(3, 8))
      .then((result) => {
        console.log(postData);
        res.render('paydetail.html', { value: 1, code_url: result.code_url, account: res.cookie['account'], email: res.cookie['email'] });
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
      })
  })
  // pay.paydo('20172321312',1,'23131232112')
  // .then((result)=>{
  //   console.log(result)
  // });

});

router.get('/reg', function (req, res, next) {
  res.render('reg.html', { value: 1 });
});


router.get('/helptemplate', function (req, res, next) {
  res.render('helptemplate.html', { active: 'helptemplate', current: 'index', account: res.cookie['account'], email: res.cookie['email'] });
});

router.get('/helpcontact', function (req, res, next) {
  res.render('helpcontact.html', { active: 'helpcontact', account: res.cookie['account'], email: res.cookie['email'] });
});

router.get('/helpjob', function (req, res, next) {
  res.render('helpjob.html', { active: 'helpjob', account: res.cookie['account'], email: res.cookie['email'] });
});

router.get('/helppoints', function (req, res, next) {
  res.render('helppoints.html', { active: 'helppoints', account: res.cookie['account'], email: res.cookie['email'] });
});

router.get('/helpindex', function (req, res, next) {
  res.render('helpindex.html', { active: 'helpindex', account: res.cookie['account'], email: res.cookie['email'] });
});

router.get('/detail', function (req, res, next) {
  let mtype = req.query.mtype;
  let img = req.query.img;
  detail.getFrom(mtype, img)
    .then((result) => {
      let d = result[0];
      res.render('detail.html', { detail: d, account: res.cookie['account'], email: res.cookie['email'] });
    })

});

router.post('/signin', function (req, res, next) {
  var postData = '';
  req.on('data', chunk => postData += chunk.toString());
  req.on('end', () => {
    let username = postData.split('&')[0].split('=')[1];
    let pwd = postData.split('&')[1].split('=')[1];
    user.login(username, pwd)
      .then((result) => {
        console.log(result);
        if (result.user == 'null') {
          res.json({ tip: '用户名或密码错误', error: '用户名或密码错误' })
        } else {
          // res.json(result.user);
          // curUser = JSON.parse(res.cookie["curUser"]);
          // console.log(user);
          res.cookie["account"] = result.user.account;
          res.cookie["email"] = result.user.email;
          // res.cookie["curUser"] = JSON.stringify(userJson);
          res.json({ tip: '登陆成功', error: '' })
        }
      })
  })
})

router.post('/signout', function (req, res, next) {
  res.cookie["account"] = '';
  res.cookie["email"] = '';
  res.json({ error: '' });
  // res.location('/js')
  // const getPromises = 
  // ['网站模板','网页特效','PHP','视频教程','酷站欣赏','整站源码'].map(par => detail.get(par));

  // Promise.all(getPromises)
  // .then(([template,js,php,video,site,source])=>
  //   res.render('index.html',{template,js,php,video,site,source,current: 'index',account:res.cookie['account'],email:res.cookie['email']})
  // )
})

router.post('/insert', function (req, res, next) {
  var postData = '';
  req.on('data', chunk => postData += chunk.toString());
  req.on('end', () => {
    console.log(postData);
    // username=goodman&pwd=w320705&email=goodman%40129.com&invite_code=
    let username = postData.split('&')[0].split('=')[1];
    let pwd = postData.split('&')[1].split('=')[1];
    let email = postData.split('&')[2].split('=')[1];
    user.insert(username, email, pwd)
      .then((result) => {
        res.json({ tip: '注册成功', error: '' });
      })
    // var account = postData.split('&')[0].split('=')[1];
    // var roleid = postData.split('&')[1].split('=')[1];
    // user.updateRole(account,roleid);

  });
  // console.log(req.body)
  // var user_name=req.body.username;  
  // var password=req.body.pwd; 
  // console.log(user_name+','+password)
});

module.exports = router;

// var express = require('express');
// var router = express.Router();
// var user = require('../models/user.js');
// var type = require('../models/type.js');
// var detail = require('../models/detail.js');
// var bodyParser = require("body-parser");
// /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index.html', {value:1});
// // });

// router.get('/', function (req, res, next) {
//   const getPromises = 
//   ['网站模板','网页特效','PHP','视频教程','酷站欣赏','整站源码'].map(par => detail.get(par));

//   Promise.all(getPromises)
//   .then(([template,js,php,video,site,source])=>
//     res.render('index.html',{template,js,php,video,site,source,current: 'index',account:res.cookie['account'],email:res.cookie['email']})
//   )

//   // detail.get('网站模板')
//   //   .then((result) => {
//   //     let template = result;
//   //     detail.get('网页特效')
//   //       .then((result) => {
//   //         let js = result;
//   //         detail.get('PHP')
//   //           .then((result) => {
//   //             let php = result;
//   //             detail.get('视频教程')
//   //               .then((result) => {
//   //                 let video = result;
//   //                 detail.get('酷站欣赏')
//   //                   .then((result) => {
//   //                     let site = result;
//   //                     detail.get('整站源码')
//   //                       .then((result) => {
//   //                         let source = result;
//   //                         res.render('index.html', {
//   //                           current: 'index',
//   //                           template: template,
//   //                           js: js,
//   //                           php: php,
//   //                           video: video,
//   //                           site: site,
//   //                           source: source
//   //                         });
//   //                       })
//   //                   })
//   //               })

//   //           })
//   //       })

//   //     // return result;
//   //   })

// });

// router.get('/search', function (req, res, next) {
//   let txt = req.query.txt;
//   detail.getAll(txt)
//   .then((results)=>{
//     console.log(results.length);
//     if(!results){
//       console.log('null')
//     }else{

//       res.render('search.html',{search:results,account:res.cookie['account'],email:res.cookie['email']});
//     }

//   })

// })

// router.get('/js', function (req, res, next) {
//   type.getTypeFrom('01')
//     .then((result) => {
//       let type = result;
//       detail.get('网页特效')
//       .then((result)=>{
//         res.render('js.html', { type: type, current: 'js',js:result,account:res.cookie['account'],email:res.cookie['email'] });
//       })

//     })
// });

// router.get('/php', function (req, res, next) {
//   type.getTypeFrom('02')
//     .then((result) => {
//       let type = result;
//       detail.get('PHP')
//       .then((result)=>{
//         res.render('php.html', { type: type, current: 'php',php:result ,account:res.cookie['account'],email:res.cookie['email']});
//       })

//     })
// });

// router.get('/templates', function (req, res, next) {
//   type.getTypeFrom('03')
//     .then((result) => {
//       let type = result;
//       detail.get('网站模板')
//       .then((result)=>{
//         res.render('templates.html', { type: type, current: 'templates',template:result,account:res.cookie['account'],email:res.cookie['email'] });
//       })

//     })
// });

// router.get('/video', function (req, res, next) {
//   type.getTypeFrom('04')
//     .then((result) => {
//       let type = result;
//       detail.get('视频教程')
//       .then((result)=>{
//         res.render('video.html', { type: type, current: 'video',video:result,account:res.cookie['account'],email:res.cookie['email'] });
//       })

//     })
// });

// router.get('/site', function (req, res, next) {
//   type.getTypeFrom('05')
//     .then((result) => {
//       let type = result;
//       detail.get('酷站欣赏')
//       .then((result)=>{
//         res.render('site.html', { type: type, current: 'site',site:result ,account:res.cookie['account'],email:res.cookie['email']});
//       })

//     })
// });

// router.get('/source', function (req, res, next) {
//   type.getTypeFrom('06')
//     .then((result) => {
//       let type = result;
//       detail.get('整站源码')
//       .then((result)=>{
//         res.render('source.html', { type: type, current: 'source',source:result,account:res.cookie['account'],email:res.cookie['email'] });
//       })

//     })
// });

// router.get('/contact', function (req, res, next) {
//   res.render('contact.html', { value: 1 ,account:res.cookie['account'],email:res.cookie['email']});
// });

// router.get('/login', function (req, res, next) {
//   res.render('login.html', { value: 1 });
// });

// router.get('/pay', function (req, res, next) {
//   res.render('pay.html', { value: 1,account:res.cookie['account'],email:res.cookie['email'] });
// });

// router.get('/reg', function (req, res, next) {
//   res.render('reg.html', { value: 1 });
// });

// router.get('/pay', function (req, res, next) {
//   res.render('reg.html', { value: 1 });
// });



// router.get('/helptemplate', function (req, res, next) {
//   res.render('helptemplate.html', { active: 'helptemplate', current: 'index',account:res.cookie['account'],email:res.cookie['email'] });
// });

// router.get('/helpcontact', function (req, res, next) {
//   res.render('helpcontact.html', { active: 'helpcontact',account:res.cookie['account'],email:res.cookie['email'] });
// });

// router.get('/helpjob', function (req, res, next) {
//   res.render('helpjob.html', { active: 'helpjob' ,account:res.cookie['account'],email:res.cookie['email']});
// });

// router.get('/helppoints', function (req, res, next) {
//   res.render('helppoints.html', { active: 'helppoints',account:res.cookie['account'],email:res.cookie['email'] });
// });

// router.get('/helpindex', function (req, res, next) {
//   res.render('helpindex.html', { active: 'helpindex',account:res.cookie['account'],email:res.cookie['email'] });
// });

// router.get('/detail', function (req, res, next) {
//   let mtype = req.query.mtype;
//   let img = req.query.img;
//   detail.getFrom(mtype,img)
//   .then((result)=>{
//     let d = result[0];
//     res.render('detail.html', { detail:d ,account:res.cookie['account'],email:res.cookie['email']});
//   })

// });

// router.post('/signin', function (req, res, next) {
//   var postData = '';
//   req.on('data', chunk => postData += chunk.toString());
//   req.on('end', () => {
//     let username = postData.split('&')[0].split('=')[1];
//     let pwd = postData.split('&')[1].split('=')[1];
//     user.login(username,pwd)
//     .then((result)=>{
//       console.log(result);
//       if(result.user == 'null'){
//         res.json({tip:'用户名或密码错误',error:'用户名或密码错误'})
//       }else{
//         // res.json(result.user);
//         // curUser = JSON.parse(res.cookie["curUser"]);
//         // console.log(user);
//         res.cookie["account"] = result.user.account;
//         res.cookie["email"] = result.user.email;
//         // res.cookie["curUser"] = JSON.stringify(userJson);
//         res.json({tip:'登陆成功',error:''})
//       }
//     })
//   })
// })

// router.post('/signout',function(req,res,next){
//   res.cookie["account"] = '';
//   res.cookie["email"] = '';
//   res.json({error:''});
//   // res.location('/js')
//   // const getPromises = 
//   // ['网站模板','网页特效','PHP','视频教程','酷站欣赏','整站源码'].map(par => detail.get(par));

//   // Promise.all(getPromises)
//   // .then(([template,js,php,video,site,source])=>
//   //   res.render('index.html',{template,js,php,video,site,source,current: 'index',account:res.cookie['account'],email:res.cookie['email']})
//   // )
// })

// router.post('/insert', function (req, res, next) {
//   var postData = '';
//   req.on('data', chunk => postData += chunk.toString());
//   req.on('end', () => {
//     console.log(postData);
//     // username=goodman&pwd=w320705&email=goodman%40129.com&invite_code=
//     let username = postData.split('&')[0].split('=')[1];
//     let pwd = postData.split('&')[1].split('=')[1];
//     let email = postData.split('&')[2].split('=')[1];
//     user.insert(username,email,pwd)
//     .then((result)=>{
//       res.json({ tip: '注册成功', error: '' });
//     })
//     // var account = postData.split('&')[0].split('=')[1];
//     // var roleid = postData.split('&')[1].split('=')[1];
//     // user.updateRole(account,roleid);

//   });
//   // console.log(req.body)
//   // var user_name=req.body.username;  
//   // var password=req.body.pwd; 
//   // console.log(user_name+','+password)
// });

// module.exports = router;
// b3705da7d3c5b013fc72fe1439de0490c3c128a8
