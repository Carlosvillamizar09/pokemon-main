class Objetos {
    constructor(nombre, tipo, daño) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.daño = daño;
    }

    usar() {
        throw new Error("El método usar() debe ser implementado por la subclase");
    }
}

export default Objetos;
