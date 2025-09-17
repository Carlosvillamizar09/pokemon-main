import Objetos from "./Objetos.js";

class Dildo extends Objetos {
    constructor() {
        super("Dildo", "Físico", 10);
    }

    usar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`Usando ${this.nombre}, que causa ${this.daño} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }
}

export default Dildo;
