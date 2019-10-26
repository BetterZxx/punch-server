var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var registerService = require('./service/register')
var loginService = require('./service/login')
var studentService = require('./service/student')
const punchService = require('./service/punch')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/register',async function(req,res){
  let results = await registerService(req)
  if(results===0){
    res.json({
      status:"fail"
    })
  }else{
    res.json({
      status:"success"
    })
  }
})
app.post('/login',async function(req,res){
  let results = await loginService(req)
  if(results===0){
    res.json({
      status:"fail"
    })
  }else{
    res.json({
      status:"success"
    })
  }
})
app.post('/updateStudentInfo',async function(req,res){
  let results = await studentService.updateStudentInfo(req)
  res.json({
    status:results===0?'fail':'success'
  })
  //console.log(req.body)
  //res.json(req.body)
})
app.post('/getStudentAndPunchInfo',async function(req,res){
  let results = await studentService.getStudentAndPunchInfo(req)
  if(results===0){
    res.json({
      status:'fail'
    })
  }else{
    res.json({
      status:'success',
      ...results
    })
  }
  console.log(req.body)
 // res.json(req.body)
})
app.post('/startPunch',async function(req,res){
  let results = await punchService.startPunch(req)
  res.json({
    status:results===0?'fail':'success'
  })
  // console.log(req.body)
  // res.json(req.body)
})
app.post('/endPunch',async function(req,res){
  let results = await punchService.endPunch(req)
  res.json({
    status:results===0?'fail':'success'
  })
  // console.log(req.body)
  // res.json(req.body)
})
app.listen('5000',function(){
  console.log('server start success')
})