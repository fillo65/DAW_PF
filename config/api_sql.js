var mysql = require("mysql");
module.exports = {
  sql: function(){
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "test"
    });
    return con;
  },
  getUsersByAula: function(id){
    return new Promise(function(resolve, reject) {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "test"
      });
      con.query('SELECT * FROM test',function(err,rows){
        if(err) {
          return reject(err);
        }
        resolve(rows);
      });

    });
  },
  saveUsers: function(id, data){
    con = this.sql();
    let stmt = '';
    con.query(stmt,function(err,rows){
      if(err) throw err;
      return rows;
    });
  }
}
