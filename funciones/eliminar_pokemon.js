import inquirer from "inquirer";
import chalk from "chalk";
import { misPokemons, sprites } from "./inicializacion_objetos.js";

async function eliminarPokemon() {
    console.clear();
    if (misPokemons.length === 0) {
        console.log(chalk.red("No tienes Pokémons para eliminar."));
        return;
    }

    const respuestas = await inquirer.prompt([
        {
            type: "list",
            name: "pokemon",
            message: chalk.yellow("🗑️ ¿Cuál Pokémon deseas eliminar?"),
            choices: misPokemons.map((pokemon, index) => ({
                name: `${sprites[pokemon.nombre]} ${pokemon.apodo} (Nivel ${pokemon.nivel})`,
            }))
        }
    ]);

    misPokemons.splice(respuestas.pokemon, 1);
    console.log("");
    console.log(chalk.red.bold("🗑️ Pokémon eliminado."));
    console.log("");
}

export { eliminarPokemon };