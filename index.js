function formatarData(dataFormatar){ //função que recebe uma data e retorna esta data no formato 'YYYY-MM-DD'
    let data = new Date(dataFormatar)
    let dataFormatada = data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + ((data.getDate() )); 
    return dataFormatada;
}

async function reservarCadeira(idCadeira, idOnibus) {
    const db = require("./db");
    const assentos = await db.selectAssentos(idOnibus);
    const assentosDisponiveis = assentos[0].oni_assentos;
    if(assentosDisponiveis.search(idCadeira) != -1 ){
        let novaString = assentosDisponiveis.replace(',' + idCadeira, '');
        await db.updateOnibus(idOnibus, novaString);
        return true;
    } else {
        return false;
    }

}

/*(async () => {
    reservarCadeira(1, 3)
})();*/

(async () => {
    const db = require("./db");
 
    const clientes = await db.selectOnibus(2);
    //console.log(clientes)

    //const result = await db.insertOnibus(2, '1,2,3,4,5', formatarData('01/06/2022'));
    const assentos = await db.selectAssentos(3);
    const assentosDisponiveis = assentos[0].oni_assentos
    const update = await reservarCadeira(1, 2);
    update == true ? console.log("Suceso em reservar.") : console.log("Falha em reservar.");
})();

