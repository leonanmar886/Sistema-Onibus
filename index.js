function formatarData(dataFormatar){
    let data = new Date(dataFormatar)
    let dataFormatada = data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + ((data.getDate() )); 
    return dataFormatada;
}

async function reservarCadeira(idCadeira, idOnibus) {
    const db = require("./db");
    const assentos = await db.selectAssentos(idOnibus);
}

(async () => {
    reservarCadeira(1, 3)
})();

/*(async () => {
    const db = require("./db");
 
    const clientes = await db.selectOnibus(2);
    console.log(clientes)

    const result = await db.insertOnibus(2, '1,2,3,4,5', formatarData('01/06/2022'));

})();*/

