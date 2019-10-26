var query = require('../model')
module.exports = async function(req){
  const data = {studentID,password,name,sex,grade,avatar} = req.body
  const params = Object.values(data)
  let sql = `insert into student(${Object.keys(data).join(',')}) values(?,?,?,?,?,?)`
  let results = await query(sql,params)
  //处理results....
  return results
}