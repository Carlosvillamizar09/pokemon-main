import chalk from "chalk";
import { misPokemons, sprites } from "./inicializacion_objetos.js";
import { mostrarBarraVida } from "./mostrarBarraVida.js";

async function mirarPokemons() {
    console.clear();
    if (misPokemons.length === 0) {
        console.log(chalk.red("No tienes Pokémons. Crea uno primero."));
        return;
    }

    console.log(chalk.bold.bgBlue("📋 Tus Pokémons:"));
    misPokemons.forEach((pokemon, index) => {
        console.log(`${index + 1}. ${sprites[pokemon.nombre]} ${pokemon.apodo} 
(Nivel ${pokemon.nivel}) - Vida: ${mostrarBarraVida(pokemon)} - Ataque: ${pokemon.ataque}`);

    });
    console.log("");
}

export { mirarPokemons };