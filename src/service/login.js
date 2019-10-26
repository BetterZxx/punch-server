var query = require('../model')
module.exports = async function(req){
  const data = {studentID,password} = req.body
  const params = Object.values(data)
  let sql = `select password from student where studentId = ${studentID}`
  let results = await query(sql)

  return results[0].password === password?1:0

}