import Pokemon from "./clases/Pokemon.js";
import Pikachu from "./clases/Pikachu.js";
import Mankey from "./clases/Mankey.js";
import Nidorino from "./clases/Nidorino.js";
import Sandslash from "./clases/Sandslash.js";
import Squirtle from "./clases/Squirtle.js";
import Rattata from "./clases/Rattata.js";
import Bulbasaur from "./clases/Bulbasaur.js";
import Raichu from "./clases/Raichu.js";
import inquirer from "inquirer";
import Objetos from "./clases/Objetos.js";
import Dildo from "./clases/Dildo.js";
import Espada from "./clases/Espada.js";
import Insulto from "./clases/Insulto.js";
import Machete from "./clases/Machete.js";
import Oz from "./clases/Oz.js";
import Pila from "./clases/Pila.js";
import chalk from "chalk";

const sprites = {
  Pikachu: `
   (\__/)
   (o^.^o) ⚡
   (")__(")
  `,

  Mankey: `
   (\__/)
   (òᴥó) 🐒
   (")__(")
  `,

  Nidorino: `
   (\__/)
   (•̀ᴗ•́) 🦏
   (︶︶︶)
  `,

  Sandslash: `
   (\__/)
   ( •_•) 🦔
   /︶︶\\
  `,

  Squirtle: `
   (\____/)
   (o^.^o) 🐢
   (︶︶︶)🌊
  `,

  Rattata: `
   (\__/)
   (•ㅅ•) 🐭
   (")__(")
  `,

  Bulbasaur: `
   (\__🌱__/)
   (•ᴗ• ) 🌱
   (︶︶︶)
  `,

  Raichu: `
   (\__/)
   (¬‿¬) ⚡
   (")__(")
  `
};

function mostrarBarraVida(pokemon) {
    const total = 20;
    const porcentaje = pokemon.maxVida > 0 ? pokemon.vida / pokemon.maxVida : 0;

    let llenos = Math.round(total * porcentaje);
    if (llenos > total) llenos = total;
    if (llenos < 0) llenos = 0;        

    let vacios = total - llenos;
    if (vacios < 0) vacios = 0;

    let color;
    if (porcentaje > 0.6) color = chalk.green;
    else if (porcentaje > 0.3) color = chalk.yellow;
    else color = chalk.red;

    return color("█".repeat(llenos)) + chalk.gray("█".repeat(vacios)) +
        ` ${pokemon.vida}/${pokemon.maxVida}`;
}


let misPokemons = [
    new Pikachu("Pika"),
    new Mankey("Manky")
];

let pokemonesBot = [
    new Pikachu("Pika"),
    new Mankey("Manky"),
    new Nidorino("Nido"),
    new Sandslash("Sandy"),
    new Squirtle("Squirt"),
    new Rattata("Ratta"),
    new Bulbasaur("Bulba"),
    new Raichu("Raichu")
];

const clasesPokemon = {
    "Pikachu": Pikachu,
    "Mankey": Mankey,
    "Nidorino": Nidorino,
    "Sandslash": Sandslash,
    "Squirtle": Squirtle,
    "Rattata": Rattata,
    "Bulbasaur": Bulbasaur,
    "Raichu": Raichu
};

let puntosPoder = 100;

function obtenerObjetosDisponibles() {
    return [
        new Dildo(),
        new Espada(),
        new Insulto(),
        new Machete(),
        new Oz(),
        new Pila()
    ];
}

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

async function consultarPuntosDePoder() {
    console.clear();
    console.log("");
    console.log(chalk.magenta.bold("🔋 Puntos de poder:"));
    console.log(`Tienes ${chalk.yellow(puntosPoder)} puntos de poder.`);
    console.log("");
}

async function subirNivelPokemon() {
    console.clear();
    if (misPokemons.length === 0) {
        console.log(chalk.red("No tienes Pokémons para subir de nivel."));
        return;
    }

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
    puntosPoder -= 10;
    console.log("");
    console.log(chalk.green.bold(`⬆️ Has subido de nivel a ${sprites[pokemonSeleccionado.nombre]} ${pokemonSeleccionado.apodo}.`));
    console.log("");
}
async function batallaPokemon() {
    console.clear();
    if (misPokemons.length < 2) {
        console.log(chalk.red("❌ Necesitas al menos dos Pokémons para una batalla."));
        return;
    }
    // Selección del primer Pokémon
    const respuesta1 = await inquirer.prompt([
        {
            type: "list",
            name: "pokemon1",
            message: chalk.cyan("⚔️ Selecciona el primer Pokémon:"),
            choices: misPokemons.map((pokemon, index) => ({
                name: `${sprites[pokemon.nombre]} ${pokemon.apodo} (Nivel ${pokemon.nivel})`,
                value: index
            }))
        }
    ]);

    const respuesta2 = await inquirer.prompt([
        {
            type: "list",
            name: "pokemon2",
            message: chalk.cyan("⚔️ Selecciona el segundo Pokémon:"),
            choices: misPokemons
                .map((pokemon, index) => ({
                    name: `${sprites[pokemon.nombre]} ${pokemon.apodo} (Nivel ${pokemon.nivel})`,
                    value: index
                }))
                .filter(choice => choice.value !== respuesta1.pokemon1)
        }
    ]);

    const objetosDisponibles = obtenerObjetosDisponibles();
    const objeto1 = await inquirer.prompt([
        {
            type: "list",
            name: "objetos",
            message: chalk.yellow("🎒 Selecciona un objeto para tu primer Pokémon:"),
            choices: objetosDisponibles.map(objeto => ({
                name: objeto.nombre,
                value: objeto
            }))
        }
    ]);
    const objeto2 = await inquirer.prompt([
        {
            type: "list",
            name: "objetos",
            message: chalk.yellow("🎒 Selecciona un objeto para tu segundo Pokémon:"),
            choices: objetosDisponibles.map(objeto => ({
                name: objeto.nombre,
                value: objeto
            }))
        }
    ]);

    const objetoElegido1 = objeto1.objetos;
    const objetoElegido2 = objeto2.objetos;
    let misObjetos = [objetoElegido1, objetoElegido2];
    const pokemon1 = misPokemons[respuesta1.pokemon1];
    const pokemon2 = misPokemons[respuesta2.pokemon2];
    let misPokemonsBatalla = [pokemon1, pokemon2];
    let pokemonesBotBatalla = [];
    const objetosBot = obtenerObjetosDisponibles();
    let objetosEscogidosBot = objetosBot[Math.floor(Math.random() * objetosBot.length)];
    let misObjetosBot = [objetosEscogidosBot];
    do {
        objetosEscogidosBot = objetosBot[Math.floor(Math.random() * objetosBot.length)];
        misObjetosBot.push(objetosEscogidosBot);
    } while (misObjetosBot.length < 2);

    const botPokemon = pokemonesBot[Math.floor(Math.random() * pokemonesBot.length)];
    let botPokemon2;
    do {
        botPokemon2 = pokemonesBot[Math.floor(Math.random() * pokemonesBot.length)];
    } while (botPokemon2 === botPokemon);
    pokemonesBotBatalla = [botPokemon, botPokemon2];

    let respuestasInicio = await inquirer.prompt([
        {
            type: "list",
            name: "pokemonActivo",
            message: chalk.cyan("👉 ¿Con cuál Pokémon deseas empezar la batalla?"),
            choices: misPokemonsBatalla.map((pokemon, index) => ({
                name: `${sprites[pokemon.nombre]} ${pokemon.apodo} (Vida: ${mostrarBarraVida(pokemon)})`,
                value: index
            }))
        }
    ]);
    let pokemonActivo = misPokemonsBatalla[respuestasInicio.pokemonActivo];
    let botActivo = pokemonesBotBatalla[0];

    console.log(chalk.magenta.bold(`⚔️ ¡Comienza la batalla! ⚔️`));
    console.log(`Tu Pokémon: ${sprites[pokemonActivo.nombre]} ${pokemonActivo.apodo}`);
    console.log("Vida: " + mostrarBarraVida(pokemonActivo));
    console.log(`Pokémon Enemigo: ${sprites[botActivo.nombre]} ${botActivo.apodo}`);
    console.log("Vida: " + mostrarBarraVida(botActivo));

    let turno = 1;
    let huido = false;
    let turnosDesdeHabilidad = 2; 
    let turnosDesdeHabilidadBot = 2; 

    console.clear();
    while (
        misPokemonsBatalla.some(p => p.vida > 0) &&
        pokemonesBotBatalla.some(p => p.vida > 0) &&
        !huido
    ) {
        console.log(chalk.blueBright(`\n--- 🔄 Turno ${turno} ---`));
        console.log(`Tu Pokémon: ${sprites[pokemonActivo.nombre]} (${pokemonActivo.apodo})`);
        console.log("Vida:", mostrarBarraVida(pokemonActivo));
        console.log(`Pokémon Enemigo: ${sprites[botActivo.nombre]} (${botActivo.apodo})`);
        console.log("Vida:", mostrarBarraVida(botActivo));

        let accion;
        let opcionValida = false;
        while (!opcionValida) {
            console.log("");
            accion = await inquirer.prompt([
                {
                    type: "list",
                    name: "opcion",
                    message: chalk.yellow("🎮 ¿Qué deseas hacer?"),
                    choices: [
                        "Atacar",
                        `Habilidad Especial${turnosDesdeHabilidad < 2 ? " (no disponible)" : ""}`,
                        "Huir",
                        "Cambiar de Pokémon",
                        "Usar Objeto"
                    ]
                }
            ]);

            if (
                accion.opcion === `Habilidad Especial${turnosDesdeHabilidad < 2 ? " (no disponible)" : ""}` &&
                turnosDesdeHabilidad < 2
            ) {
                console.log(chalk.red("⏳ La habilidad especial solo se puede usar cada dos turnos. Espera más turnos."));
            } else {
                opcionValida = true;
            }
        }

        switch (accion.opcion) {
            case "Atacar":
                console.clear();
                if (typeof pokemonActivo.atacar === "function") {
                    pokemonActivo.atacar();
                    botActivo.vida -= pokemonActivo.ataque;
                    if (botActivo.vida < 0) botActivo.vida = 0;
                } else {
                    console.log(chalk.red("❌ Este Pokémon no tiene ataque definido."));
                }
                turnosDesdeHabilidad++;
                break;
            case `Habilidad Especial`:
                console.clear();
                if (typeof pokemonActivo.habilidadEspecial === "function") {
                    pokemonActivo.habilidadEspecial();
                    botActivo.vida -= pokemonActivo.especial;
                    if (botActivo.vida < 0) botActivo.vida = 0;
                    turnosDesdeHabilidad = 0;
                } else {
                    console.log(chalk.red("❌ Este Pokémon no tiene habilidad especial definida."));
                    turnosDesdeHabilidad++;
                }
                break;
            case "Huir":
                console.clear();
                console.log(chalk.red("🏃 ¡Has huido de la batalla!"));
                huido = true;
                break;
            case "Cambiar de Pokémon":
                console.clear();
                const cambio = await inquirer.prompt([
                    {
                        type: "list",
                        name: "nuevoActivo",
                        message: chalk.cyan("🔄 ¿A qué Pokémon deseas cambiar?"),
                        choices: misPokemonsBatalla
                            .map((pokemon, index) => ({
                                name: `${sprites[pokemon.nombre]} ${pokemon.apodo} (Vida: ${pokemon.vida})`,
                                value: index
                            }))
                            .filter((choice, idx) => misPokemonsBatalla[idx].vida > 0 && misPokemonsBatalla[idx] !== pokemonActivo)
                    }
                ]);
                pokemonActivo = misPokemonsBatalla[cambio.nuevoActivo];
                console.log("");
                console.log(chalk.green(`🔄 Has cambiado a ${sprites[pokemonActivo.nombre]} ${pokemonActivo.apodo}.`));
                console.log("");
                turnosDesdeHabilidad++;
                break;
            case "Usar Objeto":
                console.clear();
                if (misObjetos.length === 0) {
                    console.log(chalk.red("❌ No tienes objetos para usar. Pierdes el turno"));
                    turnosDesdeHabilidadBot++;
                    break;
                }
                const usoObjeto = await inquirer.prompt([
                    {
                        type: "list",
                        name: "objeto",
                        message: chalk.yellow("🎒 Selecciona un objeto para usar:"),
                        choices: misObjetos.map(objeto => ({
                            name: objeto.nombre,
                            value: objeto
                        }))
                    }
                ]);
                usoObjeto.objeto.usar(pokemonActivo);
                misObjetos = misObjetos.filter(obj => obj !== usoObjeto.objeto);
                botActivo.vida -= usoObjeto.objeto.daño;
                turnosDesdeHabilidad++;
                break;
        }

        if (botActivo.vida <= 0) {
            const siguienteBot = pokemonesBotBatalla.find(p => p.vida > 0);
            if (siguienteBot) {
                botActivo = siguienteBot;
                console.log("");
                console.log(chalk.yellow(`⚠️ El Pokémon Enemigo cambia a ${sprites[botActivo.nombre]} ${botActivo.apodo}.`));
                console.log("");
            } else {
                console.log("");
                console.log(chalk.green("🎉 ¡Has derrotado a todos los Pokémons Enemigos!"));
                console.log("");
                break;
            }
        }

        if (pokemonesBotBatalla.some(p => p.vida > 0) && !huido) {
            const accionesBot = ["Atacar", turnosDesdeHabilidadBot >= 2 ? "Habilidad Especial" : null, "Cambiar", "Usar Objeto"].filter(Boolean);
            const accionBot = accionesBot[Math.floor(Math.random() * accionesBot.length)];
            switch (accionBot) {
                case "Atacar":
                    if (typeof botActivo.atacar === "function") {
                        botActivo.atacar();
                        pokemonActivo.vida -= botActivo.ataque;
                        if (pokemonActivo.vida < 0) pokemonActivo.vida = 0;
                    }
                    turnosDesdeHabilidadBot++;
                    break;
                case "Habilidad Especial":
                    if (turnosDesdeHabilidadBot >= 2) {
                        if (typeof botActivo.habilidadEspecial === "function") {
                            botActivo.habilidadEspecial();
                            pokemonActivo.vida -= botActivo.especial;
                            if (pokemonActivo.vida < 0) pokemonActivo.vida = 0;
                            turnosDesdeHabilidadBot = 0;
                        } else {
                            console.log(chalk.red("❌ El Pokémon enemigo no tiene habilidad especial definida."));
                            turnosDesdeHabilidadBot++;
                        }
                    } else {
                        console.log(chalk.red("⏳ El bot no puede usar la habilidad especial este turno."));
                        turnosDesdeHabilidadBot++;
                    }
                    break;
                case "Cambiar":
                    const siguienteBot = pokemonesBotBatalla.find(p => p.vida > 0 && p !== botActivo);
                    if (siguienteBot) {
                        botActivo = siguienteBot;
                        console.log("");
                        console.log(chalk.yellow(`🔄 El enemigo cambia su Pokémon a: ${sprites[botActivo.nombre]} ${botActivo.apodo}.`));
                        console.log("");
                    }
                    turnosDesdeHabilidadBot++;
                    break;
                case "Usar Objeto":
                    if (misObjetosBot.length > 0) {
                        const objetoBot = misObjetosBot[Math.floor(Math.random() * misObjetosBot.length)];
                        objetoBot.usar(botActivo);
                        misObjetosBot = misObjetosBot.filter(obj => obj !== objetoBot);
                        pokemonActivo.vida -= objetoBot.daño;
                    } else {
                        console.log(chalk.red("❌ El enemigo no tiene objetos para usar. Pierde el turno."));
                    }
                    turnosDesdeHabilidadBot++;
                    break;
            }
        }

        // Si tu Pokémon activo muere
        if (pokemonActivo.vida <= 0) {
            const siguiente = misPokemonsBatalla.find(p => p.vida > 0);
            if (siguiente) {
                pokemonActivo = siguiente;
                console.log("");
                console.log(chalk.red(`💀 Tu Pokémon activo ha sido derrotado. Cambias a ${sprites[pokemonActivo.nombre]} ${pokemonActivo.apodo}.`));
                console.log("");
            } else {
                console.log("");
                console.log(chalk.red("💀 Todos tus Pokémons han sido derrotados."));
                console.log(chalk.red("❌ ¡Has perdido la batalla!"));
                console.log("");
                break;
            }
        }

        turno++;
    }

    if (huido) {
        console.log(chalk.red("🏃 Has huido. El enemigo gana la batalla."));
    } else if (!misPokemonsBatalla.some(p => p.vida > 0)) {
        console.log(chalk.red("❌ Tus Pokémon han sido derrotados. El enemigo gana la batalla."));
    } else if (!pokemonesBotBatalla.some(p => p.vida > 0)) {
        console.log(""); 
        console.log(chalk.green.bold("🎉 ¡Felicidades! Has ganado la batalla."));
        console.log("");
        console.log(chalk.yellow("✨ Ganaste 20 puntos de poder."));
        console.log("");
        puntosPoder += 20;
    }
    misPokemons.forEach(p => {
    p.vida = p.maxVida;
})};

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

main();
