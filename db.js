async function conecta(params) {
    if(global.connection && global.connection.state !== 'disconnected') // verifica se já existe uma conecção, e se houver, ela é utilizada
        return global.connection

    const mysql = require("mysql2/promise")
    const coneccao = await mysql.createConnection("mysql://root:261102leo@localhost:3306/sistemaonibus")
    global.connection = coneccao
    return coneccao
}

conecta();

async function selectOnibus(id){ //função que retorna os dados do onibus correspondente ao id passado como parametro
    const coneccao = await conecta();
    const sql = 'SELECT * FROM onibus WHERE ?;'
    const[linhas] = await coneccao.query(sql, id);
    return linhas;
}

async function selectAssentos(id){ //função que retorna todos os assentos disponíveis do onibus
    const coneccao = await conecta();
    const sql = 'SELECT oni_assentos FROM onibus WHERE oni_id = ?;'
    const results = await coneccao.query(sql, id);
    return results[0];
}

async function updateOnibus(id, valorCampo){//função que atualiza o onibus. O unico campo que pode ser alterado é a lista de assentos disponíveis.
    const coneccao = await conecta();
    const sql = "UPDATE onibus SET oni_assentos = '?' WHERE oni_id = ?"
    const valores = [valorCampo, id];
    return await coneccao.query(sql, valores);
}

async function insertOnibus(numLinha, assentosDisponiveis, data){ //função que insere um novo onibus
    const coneccao = await conecta();
    const sql = "INSERT INTO onibus(oni_linha, oni_assentos, oni_data) VALUES (?, ?, ?);"
    const valores = [numLinha, assentosDisponiveis, data];
    return await coneccao.query(sql, valores);
}



module.exports = {selectOnibus, insertOnibus, selectAssentos, updateOnibus};

