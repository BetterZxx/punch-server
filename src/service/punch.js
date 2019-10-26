
var query = require('../model')
var moment = require('moment')
exports.startPunch = async function(req){
  const {studentID} = req.body
  
  let querySql = `SELECT * FROM punch_log WHERE studentId = ${studentID} AND punch = 0`
  let queryResults = await query(querySql)
  if(queryResults.length !== 0){
    return 0
  }

  let punchData = {
    punch:0,
    startTime:moment().format('x'),
    studentId:studentID
  }

  const params = Object.values(punchData)
  let insertSql = `insert into punch_log(${Object.keys(punchData).join(',')}) values(?,?,?)`
  let insertResults = await query(insertSql,params)
  console.log(insertResults)
  //处理results....
  return insertResults
}
exports.endPunch = async function(req){
  const {studentID} = req.body
  
  let querySql = `SELECT * FROM punch_log WHERE studentId = ${studentID} AND punch = 0`
  let queryResults = await query(querySql)
  if(queryResults.length === 0){
    return 0
  }

  let punchData = {
    punch:1,
    endTime:moment().format('x'),
  }

  const params = Object.values(punchData)
  let updateSql = `update punch_log set ${Object.keys(punchData).map(item=>`${item} = ?`).join(',')} where studentId = ${studentID}`
  let updateResults = await query(updateSql,params)
  console.log(updateResults)
  //处理results....
  return updateResults
}