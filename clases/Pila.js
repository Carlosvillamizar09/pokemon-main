import Objetos from "./Objetos.js";

class Pila extends Objetos {
    constructor() {
        super("Pila", "Mental", 40);
    }
    usar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`Usando ${this.nombre}, que causa ${this.daño} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }
}

export default Pila;
