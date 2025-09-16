import Pokemon from "./Pokemon.js";

class Raichu extends Pokemon {
    constructor(apodo) {
        super("Raichu", "Eléctrico", apodo, 180, 70, 1, 75);
    }

    atacar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) lanza un ataque eléctrico que causa ${this.ataque} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }

    habilidadEspecial() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) usa Rayo Carga! Causa ${this.especial} puntos de daño.`);
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

export default Raichu;
