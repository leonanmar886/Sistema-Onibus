const express = require('express')
const { type } = require('express/lib/response')
const res = require('express/lib/response')
const rotas = express.Router()
var fs = require('fs')

// Rota da página principal
rotas.get('/', (req,res) =>{
    res.sendFile(__dirname + '/entrada.html')
})

// Rota da função de cadastro
rotas.get('/cadastrar', (req, res) => {
    let login = req.query['login']
    let senha = req.query['senha']
    let prof = req.query['profissao']
    // Chamada da função de inserção de usuário no banco.
    console.log("Usuário do tipo: " + prof + " com login: " + login + " e senha: " + senha + " cadastrado!")
    res.sendFile(__dirname + '/entrada.html')
})

// Rota de login
rotas.get('/entrar', (req, res) => {
    let login = req.query['login']
    let senha = req.query['senha']

    // Chamada da função de requisição dos dados do usuário
    console.log('Login: ' + login + ' Senha: ' + senha)
    
    const banco = require('./db')
    let todosOnibus = []

    const assentos = banco.selectAllOnibus()
    console.log(assentos)

    let onibus = ['Pici01  <br>DESTINO: Campus do pici', 'Pici02  <br>DESTINO: Campus do pici', 'Benfica01  <br>DESTINO: Campus do Benfica', 'Porangabuçu01  <br>DESTINO: Campus do Porangabuçu']
    var data = new Date()
    horas = ['07:00', '08:00', '09:00', '10:00','11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
    reserva = [[20, 'Pici', '07:00', '20', '30/06/2022'], [30, 'Benfica', '08:00', '22', '31/06/2022']]
    var data1 = data.getDay() + '/' + data.getDate() + '/' + data.getFullYear()
    if(false){
        res.sendFile(__dirname + '/entrada.html')
    } else{
        var pagina = `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="shortcut icon" href="bustransport_bus_4984.ico" type="image/x-icon">
                <link rel="stylesheet" href="estilo.css">
                <style>
                    body{
                        font-family: Arial, Helvetica, sans-serif;
                        background-color: #D9D9D9;
                    }
                    
                </style>
                <title>Linhas</title>
            </head>
            
            <body class="prim">
                <header>
                    <img src="bustransport_bus_4984.ico" alt="icone-onibus">
                    <ul>
                        <a class="cabecalho-menu-item" href="entrada.html"><li>Início</li></a>
                        <a class="cabecalho-menu-item" href="linha.html"> <li>Reserva</li></a>
                        <a class="cabecalho-menu-item" href="addlinha.html"> <li>Adicionar nova linha</li> </a>
                    </ul>
                
            
                </header><hr>
                <main>
                    <div id="top1">
                        <h2>Suas viagens, ` + login + `:</h2>
                        </div>
                        <div id="top2">
                            <h3>Viagens agendadas:</h4>
                        </div>
                        <div id="agendados">
                            <h4 class="descricao-agendados">Linha:</h4>
                            <h4 class="descricao-agendados">Destino:</h4>
                            <h4 class="descricao-agendados">Horário:</h4>
                            <h4 class="descricao-agendados">Assento:</h4>
                            <h4 class="descricao-agendados">Dia:</h4>
                        </div>`
        pagina = pagina + '\n<table>'
        for(var x in reserva){
            pagina = pagina + '\n<tr><td>' + reserva[x][0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>' + '<td>' + reserva[x][1] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>' + '<td>' + reserva[x][2] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>' + '<td>' + reserva[x][3] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>' + '<td>' + reserva[x][4] + '</td>' + '</tr>'
}
      pagina = pagina + `
  
          \n</table>\n<div id="bot1">
                          <h2>Nova viagem:</h2>
                      </div>
                      <div id="bot2">
                          <h3>Reserve assento em uma linha cadastrada.</h3>
                      </div>
                          <form action="/assentos" method="get">
                              <label for="onibus">Onibus</label>
                                <select name="bus" id="bus">`

    for(x in onibus){
        pagina = pagina + '<option value="' + onibus[x] + '">' + onibus[x] + '</option>'
    }
    pagina = pagina + `</select>
                    <label for="onibus">Horario</label>
                        <select name="horario" id="horario">`
    for (x in horas){
      pagina = pagina + '<option value="' + horas[x] + '">' + horas[x] + '</option>'
    }
    pagina = pagina + `</select>
                    
                    <button type="submit">reservar</button>
                </form>

            </div>


        </main>
        </body>
        </html>`
                        
    
    }
    res.send(pagina)

})

// Rota que mostra os assentos disponíveis
rotas.get('/assentos', (req, res) => {
    let linha = req.query['bus']
    let data = req.query['horario']
    var pagina = `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" href="bustransport_bus_4984.ico" type="image/x-icon">
        <style>
                body{
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: #D9D9D9;
                }
        </style>
        <link rel="stylesheet" href="estilo.css">
        <title>Reserva de assento</title>
    </head>
    <body>
        <header>
            <img src="bustransport_bus_4984.ico" alt="icone-onibus">
            <ul>
                <a class="cabecalho-menu-item" href="entrada.html"><li>Início</li></a>
                <a class="cabecalho-menu-item" href="linha.html"> <li>Reserva</li></a>
                <a class="cabecalho-menu-item" href="addlinha.html"> <li>Adicionar nova linha</li> </a>
            </ul>
        </header><hr>
        <h1 class="linhaselecionada">LINHA: `+ linha + `</h1>
        <h1 class="linhaselecionada">HORÁRIO: `+ data + `</h1>
        <div class="modal-wrapper">
                <div class="modal">
                    <span>Selecione sua poltrona</span>
                </div>
        </div><br>
                
        <section id="assentos">
            <div class="A4">
                <table class="A2">`
    const acc01 = [1,2,5,6,9,10,13,14,17,18,21,22]
    const acc02 = [4,3,8,7,12,11,16,15,20,19,24,23]
    var disponiveis = [1,2,3,4,5,6,7,8]
    var cont = 0
    var i;
    for(let x in acc01){
        i = acc01[x]
        if(cont == 0){
            pagina = pagina + '\n<tr>'
        }
        else if(cont == 2){
                cont = 0
                pagina = pagina + '\n</tr>'
        }
    

        if(disponiveis.indexOf(acc01[x]) !== -1){
            pagina = pagina + '\n<th><input style="background-color: green;" id="B' + String(i) +'" class="A1" type="button" value="A' + String(i) +'" onclick="clicado("B' + String(i) + '")"/></th>'
            cont = cont + 1
        }else{
            pagina = pagina + '\n<th><input style="background-color: red;" id="B' + String(i) +'" class="A1" type="button" value="A' + String(i) +'" onclick="clicado("B' + String(i) + '")"/></th>'
            cont = cont + 1
        }
    }

    pagina = pagina + '\n</table>\n</div>\n<div class="A4">\n<table class="A3">'

    for(let x in acc02){
        i = acc02[x]
        if(cont === 0){
            pagina = pagina + '\n<tr>'
        }
        else if(cont == 2){
                cont = 0
                pagina = pagina + '\n</tr>'
        }

        if(disponiveis.indexOf(acc02[x]) !== -1){
            pagina = pagina + '\n<th><input style="background-color: green;" id="B' + String(i) +'" class="A1" type="button" value="A' + String(i) +'" onclick="clicado("B' + String(i) + '")"/></th>'
            cont = cont + 1
        }else{
            pagina = pagina + '\n<th><input style="background-color: red;" id="B' + String(i) +'" class="A1" type="button" value="A' + String(i) +'" onclick="clicado("B' + String(i) + '")"/></th>'
            cont = cont + 1
        }
    }
    pagina = pagina + `</table>
                        </div>
                        </section>
        </body>
        </html>`
    res.send(pagina)
})

// Rota de cadastro de novas linhas
rotas.get('/inserirlinha', (req, res) => {
    let numero = req.query['numero']
    let nome = req.query['busname']
    let parada = req.query['parada']
    let horario = req.query['horario']
  
    var pagina = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style>
                body{
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: #D9D9D9;
                }
        </style>
        <link rel="stylesheet" href="estilo.css">
        <link rel="shortcut icon" href="bustransport_bus_4984.ico" type="image/x-icon">
        <title>Adicione uma nova linha</title>
    </head>
    <body class="prim">
        <header>
            <img src="bustransport_bus_4984.ico" alt="icone-onibus">
            <ul>
                <a class="cabecalho-menu-item" href="/"><li>Início</li></a>
                <a class="cabecalho-menu-item" href="/entrar"> <li>Reserva</li></a>
                <a class="cabecalho-menu-item" href="addlinha.html"> <li>Adicionar nova linha</li> </a>
            </ul>
        </header>
  
      <div class='dados-linha'>
        <h1>Linha Cadastrada!</h1>
        <p><b>Nome: </b>` + nome + `</p>
        <p><b>Número: </b>` + numero + `</p>
        <p><b>Parada: </b>` + parada + `</p>
        <p><b>Horário de Saída: </b>` + horario + `</p>
      </div>

    </body>
  </html>`
  res.send(pagina)
  })
module.exports = rotas