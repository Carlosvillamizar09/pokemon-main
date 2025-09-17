import inquirer from "inquirer";
import chalk from "chalk";
import { crearPokemon } from "./crear_pokemon.js";
import { mirarPokemons } from "./mirar_pokemon.js";
import { eliminarPokemon } from "./eliminar_pokemon.js";
import { consultarPuntosDePoder } from "./consultar_puntos.js";
import { subirNivelPokemon } from "./subir_nivel.js";
import { batallaPokemon } from "./batalla.js";



async function main() {
    inquirer.prompt([
        {
            type: "list",
            name: "accion",
            message: chalk.cyan.bold("🌍 Bienvenido al mundo Pokémon. ¿Qué deseas hacer?"), 
            choices: [
                chalk.green("➕ Crear nuevo Pokémon"),
                chalk.blue("👀 Mirar Mis Pokémons"),
                chalk.red("🗑️ Eliminar un Pokémon"),
                chalk.yellow("⚡ Consultar puntos de poder"),
                chalk.magenta("⬆️ Subir nivel a un Pokémon"),
                chalk.cyan("⚔️ Batalla Pokémon"),
                chalk.gray("🚪 Salir")
            ]
        }
    ]).then(async answers => {
        switch (answers.accion) {
            case chalk.green("➕ Crear nuevo Pokémon"):
                await crearPokemon();
                break;
            case chalk.blue("👀 Mirar Mis Pokémons"):
                await mirarPokemons();
                break;
            case chalk.red("🗑️ Eliminar un Pokémon"):
                await eliminarPokemon();
                break;
            case chalk.yellow("⚡ Consultar puntos de poder"):
                await consultarPuntosDePoder();
                break;
            case chalk.magenta("⬆️ Subir nivel a un Pokémon"):
                await subirNivelPokemon();
                break;
            case chalk.cyan("⚔️ Batalla Pokémon"):
                await batallaPokemon();
                break;
            case chalk.gray("🚪 Salir"):
                console.log(chalk.green.bold("👋 ¡Hasta luego, Entrenador Pokémon!"));
                return;
        }
        await main(); 
    });
}

export { main };