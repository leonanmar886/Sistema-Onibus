const express = require('express')
var fs = require('fs')
const app = express()
const porta = process.env.PORT

// Rota que redireciona para a página principal
app.get("/", (req, res)=>
{
    fs.readFile('index.html', (err, data)=>{
        res.write(data)
        return res.end()
    })
})

app.listen(porta || 8080, ()=>{console.log('Servidor rodando!')})

/*
const acc01 = [1,2,5,6,9,10,13,14,17,18,21,22]
function clicado(idBotao){
    botao = document.getElementById(idBotao)
    botao.style.backgroundColor = 'yellow';
    let inBT = idBotao
    let dados = inBT.split("")
    dados[1] = parseInt(dados[1])
    let x = dados[1]
    if(acc01.indexOf(x) !== -1){
        while(x <= 22){
            if(x % 2 !== 0){
                x = x + 1
                let idBT = 'A' + String(x)
                let botao1 = document.getElementById(idBT)
                botao.style.backgroundColor = 'red';
            }
        }
    }
}
*/