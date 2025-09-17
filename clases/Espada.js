import Objetos from "./Objetos.js";

class Espada extends Objetos {
    constructor() {
        super("Espada", "Físico", 15);
    }
    usar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`Usando ${this.nombre}, que causa ${this.daño} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }
}

export default Espada;
