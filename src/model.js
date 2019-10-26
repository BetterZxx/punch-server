var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '119.23.29.240',
  user     : 'root',
  password : 'root',
  database : 'punch'
});
connection.connect();
module.exports = function(...args){
  return new Promise((resolve,reject)=>{
    connection.query(...args, function (error, results, fields) {
      if (error) {
        console.log(error)
        resolve(0)
      }
      else resolve(results)
      //console.log('The solution is: ', results);
    });
  })
}
