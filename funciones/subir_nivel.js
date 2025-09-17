import inquirer from "inquirer";
import chalk from "chalk";
import { misPokemons, sprites, getPuntosPoder, setPuntosPoder } from "./inicializacion_objetos.js";

async function subirNivelPokemon() {
    console.clear();
    if (misPokemons.length === 0) {
        console.log(chalk.red("No tienes Pokémons para subir de nivel."));
        return;
    }

    const puntosPoder = getPuntosPoder();
    if (puntosPoder < 10) {
        console.log(chalk.red("❌ No tienes suficientes puntos de poder para subir de nivel. Necesitas al menos 10 puntos."));
        return;
    }

    const respuestas = await inquirer.prompt([
        {
            type: "list",
            name: "pokemon",
            message: chalk.yellow("⬆️ ¿Cuál Pokémon deseas subir de nivel?"),
            choices: misPokemons.map((pokemon, index) => ({
                name: `${sprites[pokemon.nombre]} ${pokemon.apodo} (Nivel ${pokemon.nivel})`,
                value: index
            }))
        }
    ]);

    const pokemonSeleccionado = misPokemons[respuestas.pokemon];
    pokemonSeleccionado.subirNivel();
    setPuntosPoder(puntosPoder - 10); // Update the value of puntosPoder
    console.log("");
    console.log(chalk.green.bold(`⬆️ Has subido de nivel a ${sprites[pokemonSeleccionado.nombre]} ${pokemonSeleccionado.apodo}.`));
    console.log("");
}

export { subirNivelPokemon };