import Objetos from "./Objetos.js";

class Oz extends Objetos {
    constructor() {
        super("Oz", "Físico", 25);
    }

    usar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`Usando ${this.nombre}, que causa ${this.daño} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }
}

export default Oz;
