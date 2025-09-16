class Pokemon {
    constructor(nombre, tipo, apodo, vida, ataque, nivel, especial) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.apodo = apodo;
        this.vida = vida;
        this.ataque = ataque;
        this.nivel = nivel;
        this.especial = especial;
    }

    atacar() {
        throw new Error("El método atacar() debe ser implementado por la subclase");
    }

    habilidadEspecial() {
        throw new Error("El método habilidadEspecial() debe ser implementado por la subclase");
    }

    subirNivel() {
        throw new Error("El método subirNivel() debe ser implementado por la subclase");
    }
}
export default Pokemon;