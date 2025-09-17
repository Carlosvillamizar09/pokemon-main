import Objetos from "./Objetos.js";

class Insulto extends Objetos {
    constructor() {
        super("Insulto", "Mental", 5);
    }

    usar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`Usando ${this.nombre}, que causa ${this.daño} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }
}

export default Insulto;
