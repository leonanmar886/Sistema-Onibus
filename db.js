async function conecta(params) {
    if(global.connection && global.connection.state !== 'disconnected') // verifica se já existe uma conecção, e se houver, ela é utilizada
        return global.connection

    const mysql = require("mysql2/promise")
    const coneccao = await mysql.createConnection("mysql://root:261102leo@localhost:3306/sistemaonibus")
    console.log("Conectou no MySQL!");
    global.connection = coneccao
    return coneccao
}

conecta();

async function selectOnibus(id){
    const coneccao = await conecta();
    const sql = 'SELECT * FROM onibus WHERE ?;'
    const[linhas] = await coneccao.query(sql, id);
    return linhas;
}
module.exports = {selectOnibus};

//async function insertOnibus()

