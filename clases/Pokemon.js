export default class Pokemon {
    constructor(nombre, tipo, apodo, vida, ataque, nivel, especial) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.apodo = apodo;
        this.vida = vida;
        this.maxVida = vida; // ✅ añadido: vida máxima inicial
        this.ataque = ataque;
        this.nivel = nivel;
        this.especial = especial;
    }

    // Método de ataque normal
    atacar() {
        console.log(`${this.nombre} ${this.apodo} ataca con ${this.ataque} puntos de daño.`);
    }

    // Método de habilidad especial
    habilidadEspecial() {
        console.log(`${this.nombre} ${this.apodo} usa su habilidad especial causando ${this.especial} puntos de daño.`);
    }

    // Subir de nivel aumenta atributos
    subirNivel() {
    this.nivel++;
    this.ataque += 5;
    this.especial += 5;
    this.maxVida += 10;
    this.vida = this.maxVida; // ⚡ corregido: siempre iguala a la nueva maxVida
    console.log(`${this.nombre} ${this.apodo} ha subido a nivel ${this.nivel}.`);
}
}
