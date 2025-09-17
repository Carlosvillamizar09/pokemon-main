import Pokemon from "./Pokemon.js";

class Rattata extends Pokemon {
    constructor(apodo) {
        super("Rattata", "Normal", apodo, 130, 56, 1, 88);
    }
    atacar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) lanza un ataque normal que causa ${this.ataque} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }

    habilidadEspecial() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) muerde a su oponente! Causa ${this.especial} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }
}

export default Rattata;
