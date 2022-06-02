async function conecta(params) {
    const mysql = require('mysql2/promise');

    // create the connection to database
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'sistemaonibus',
      password: '261102leo'
    });
    
    // simple query
    return connection
}


async function aaa(){
    const coneccao = await conecta();
    coneccao.query(
        'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
        function(err, results, fields) {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
}
aaa();
