var query = require('../model')
var moment = require('moment')
exports.updateStudentInfo = async function(req){
  const data = {studentID,password,name,sex,grade,avatar} = req.body
  const params = Object.values(data)
  let sql = `update student set ${Object.keys(data).map(item=>`${item} = ?`).join(',')} where studentId = ${studentID}`
  let results = await query(sql,params)
  console.log(results)

  return results===0?0:1
}
exports.getStudentAndPunchInfo = async function(req){
  const {studentID} = req.body
  let stuSql = `select * from student where studentId = ${studentID}`
  let studentResults = await query(stuSql)

  let allStudentsSql = `select * from student`
  let indexStudentsResults = await query(allStudentsSql)
  let currentWeekTime = getCurrWeekDays()
  let currentDayTime = getCurrDays()
  let unfinishTime = 0
  let studentPunch = false
  async function getIndexItem(i){  
    let sql = `select * from punch_log where startTime between ${currentWeekTime[0]} and ${currentWeekTime[1]} and studentId = ${indexStudentsResults[i].studentId}`
    let results = await query(sql)
    indexStudentsResults[i].punchData = results
    i++
    if(i<indexStudentsResults.length)
      await getIndexItem(i)
   // console.log('index',results)
  }
  
  if(studentResults===0||studentResults.length===0){
    return 0
  }
  await getIndexItem(0)
  indexStudentsResults.forEach(item=>{
    console.log(item.punchData)
  })

  let indexStudents = indexStudentsResults.map(item=>{
    let punchs = item.punchData
    function getWeekTime(){
      let weekTime = 0
      console.log('dddddddddddddddd',punchs)
      punchs.forEach(element=>{
        weekTime += element.endTime - element.startTime 
      })
      item.weekTime = (weekTime/1000/60/60).toFixed(2);
    }
    function getDayTime(){
      let curDay = getCurrDays()
      let todayTime = 0
      punchs.filter(element=>{
        return +element.startTime<curDay[1]&&+element.startTime>curDay[0]
      }).forEach(element=>{
        todayTime += element.endTime - element.startTime
      })
      item.todayTime = (todayTime/1000/60/60).toFixed(2)
    }
    function isPunch(){
      let punch = punchs.find(element => {
        console.log(element.punch)
        return +element.punch === 0
      });
      console.log('punch',punch,punchs)
      punchs = item.punchData = punchs.filter(element => {
        if(element.studentId===studentID){
          studentPunch = !!punch
          unfinishTime = punch&&punch.startTime||0
        }
        return +element.punch === 1
      });
      item.punch = !!punch
    }
    function getWeekLeftTime(){
      item.weekLeftTime = 28 - item.weekTime
      
    }
  
    isPunch()
    getWeekTime()
    getDayTime()
    getWeekLeftTime()
    return item
  })



  console.log('indexStudents',indexStudents)
  console.log(indexStudentsResults)
  

  return {
    unfinishTime,
    student:{...studentResults[0],punch:studentPunch},
    indexStudents,
  }
}


function getCurrWeekDays(){
  let date = []
  let start = moment().startOf('week').format('x')
  let end = moment().endOf('week').format('x')
  date.push(start)
  date.push(end)
  return date
}

function getCurrDays(){
  let date = []
  date.push(moment().startOf('days').format('x'))
  date.push( moment().endOf('days').format('x') )
  // 获取当天的开始结束时间，精确到时分秒
  return date
}