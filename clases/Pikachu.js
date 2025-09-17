import Pokemon from "./Pokemon.js";

class Pikachu extends Pokemon {
    constructor(apodo) {
        super("Pikachu", "Eléctrico", apodo, 200, 55, 1, 75);
    }

    atacar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) lanza un rayo eléctrico ⚡ que causa ${this.ataque} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }

    habilidadEspecial() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) usa Trueno! ⚡ Causa ${this.especial} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }
}

export default Pikachu;

