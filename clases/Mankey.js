import Pokemon from "./Pokemon.js";

class Mankey extends Pokemon {
    constructor(apodo) {
        super("Mankey", "Lucha", apodo, 140, 58, 1, 87);
    }

    atacar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) lanza un ataque de lucha que causa ${this.ataque} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }

    habilidadEspecial() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) usa Puño Fuego! Causa ${this.especial} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }
}

export default Mankey;