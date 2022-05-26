async function conecta(params) {
    if(global.connection && global.connection.state !== 'disconnected') // verifica se já existe uma conecção, e se houver, ela é utilizada
        return global.connection

    const mysql = require("mysql2/promise")
    const coneccao = await mysql.createConnection("mysql://root:261102leo@localhost:3306/sistemaonibus")
    global.connection = coneccao
    return coneccao
}