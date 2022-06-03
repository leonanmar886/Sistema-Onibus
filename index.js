const express = require('express')
const rotas = require('./routes')
const porta = process.env.PORT || 8080
const app = express()

app.use(express.static(__dirname))
console.log(__dirname)
app.use('/', rotas)

app.listen(porta, () => {console.log('Servidor rodando! http://localhost:' + porta)})

/*
(async () => {
    const db = require("./db");
 
    const clientes = await db.selectOnibus(2);
    console.log(clientes)
})();
*/

