import Pokemon from "./Pokemon.js";

class Bulbasaur extends Pokemon {
    constructor(apodo) {
        super("Bulbasaur", "Planta", apodo, 150, 50, 1, 60);
    }

    atacar() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} (${this.apodo}) lanza un ataque de planta que causa ${this.ataque} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }

    habilidadEspecial() {
        console.log("");
        console.log("===================================================================================");
        console.log(`${this.nombre} ha usado Fotosíntesis y causa ${this.especial} puntos de daño.`);
        console.log("===================================================================================");
        console.log("");
    }
}

export default Bulbasaur;
