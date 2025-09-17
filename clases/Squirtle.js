import Pokemon from "./Pokemon.js";

class Squirtle extends Pokemon {
    constructor(apodo) {
        super("Squirtle", "Agua", apodo, 180, 48, 1, 55);
    }
    atacar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) lanza un ataque de agua que causa ${this.ataque} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }

    habilidadEspecial() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) usa Hidro Bomba! Causa ${this.especial} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }
}

export default Squirtle;
