import Pokemon from "./Pokemon.js";

class Sandslash extends Pokemon {
    constructor(apodo) {
        super("Sandslash", "Tierra", apodo, 130, 75, 1, 99);
    }

    atacar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) lanza un ataque de tierra que causa ${this.ataque} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }

    habilidadEspecial() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) usa Terremoto! Causa ${this.especial} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }

    subirNivel() {
        this.nivel++;
        this.ataque += 5;
        this.vida += 3;
        this.especial += 7;
    }
}

export default Sandslash;
