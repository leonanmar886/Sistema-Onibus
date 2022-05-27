(async () => {
    const db = require("./db");
 
    const clientes = await db.selectOnibus(2);
    console.log(clientes)
})();

