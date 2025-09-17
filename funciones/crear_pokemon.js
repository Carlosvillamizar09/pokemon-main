import inquirer from "inquirer";
import chalk from "chalk";
import { misPokemons, clasesPokemon, sprites } from "./inicializacion_objetos.js";

async function crearPokemon() {
    console.clear();
    const respuestas = await inquirer.prompt([
        {
            type: "list",
            name: "tipo",
            message: chalk.cyan("✨ Selecciona el Pokémon:"),
            choices: [
                "Pikachu",
                "Mankey",
                "Nidorino",
                "Sandslash",
                "Squirtle",
                "Rattata",
                "Bulbasaur",
                "Raichu"
            ]
        }
    ]);

    const apodoRespuesta = await inquirer.prompt([
        {
            type: "input",
            name: "apodo",
            message: chalk.cyan("🐾 ¿Cuál es el apodo de tu Pokémon?"),
            validate: input => input.trim() !== "" ? true : "El apodo no puede estar vacío."
        }
    ]);

    const tipoSeleccionado = clasesPokemon[respuestas.tipo];
    let nuevoPokemon = new tipoSeleccionado(apodoRespuesta.apodo);
    misPokemons.push(nuevoPokemon);
    console.log("");
    console.log(chalk.green.bold("✔ Pokémon creado:"), sprites[respuestas.tipo]);
    console.log("");
};

export { crearPokemon };