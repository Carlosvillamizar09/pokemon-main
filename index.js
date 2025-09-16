
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
            message: "¿Selecciona el Pokémon?",
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
            message: "¿Cuál es el apodo de tu Pokémon?",
            validate: input => input.trim() !== "" ? true : "El apodo no puede estar vacío."
        }
    ]);

    const tipoSeleccionado = clasesPokemon[respuestas.tipo];
    let nuevoPokemon = new tipoSeleccionado(apodoRespuesta.apodo);
    misPokemons.push(nuevoPokemon);
    console.log("");
    console.log("===================================================================================");
    console.log(`Has creado un Pokémon de tipo ${respuestas.tipo} con el apodo ${apodoRespuesta.apodo}.`);
    console.log("===================================================================================");
    console.log("");
};

async function mirarPokemons() {
    console.clear();
    if (misPokemons.length === 0) {
        console.log("No tienes Pokémons. Crea uno primero.");
        return;
    }

    console.log("Tus Pokémons:");
    console.log("===================================================================================");
    misPokemons.forEach((pokemon, index) => {
        console.log(`${index + 1}. ${pokemon.nombre} ${pokemon.apodo} (Nivel ${pokemon.nivel}) - Vida: ${pokemon.vida} - Ataque: ${pokemon.ataque}`);
    });
    console.log("===================================================================================");
    console.log("");
}

async function eliminarPokemon() {
    console.clear();
    if (misPokemons.length === 0) {
        console.log("No tienes Pokémons para eliminar.");
        return;
    }

    const respuestas = await inquirer.prompt([
        {
            type: "list",
            name: "pokemon",
            message: "¿Cuál Pokémon deseas eliminar?",
            choices: misPokemons.map((pokemon, index) => ({
                name: `${pokemon.nombre} ${pokemon.apodo} (Nivel ${pokemon.nivel})`,
                value: index
            }))
        }
    ]);

    misPokemons.splice(respuestas.pokemon, 1);
    console.log("");
    console.log("===================================================================================");
    console.log("Pokémon eliminado.");
    console.log("===================================================================================");
    console.log("");
}

async function consultarPuntosDePoder() {
    console.clear();
    console.log("");
    console.log("===================================================================================");
    console.log(`Tienes ${puntosPoder} puntos de poder.`);
    console.log("===================================================================================");
    console.log("");
}

async function subirNivelPokemon() {
    console.clear();
    if (misPokemons.length === 0) {
        console.log("No tienes Pokémons para subir de nivel.");
        return;
    }

    if (puntosPoder < 10) {
        console.log("No tienes suficientes puntos de poder para subir de nivel. Necesitas al menos 10 puntos.");
        return;
    }

    const respuestas = await inquirer.prompt([
        {
            type: "list",
            name: "pokemon",
            message: "¿Cuál Pokémon deseas subir de nivel?",
            choices: misPokemons.map((pokemon, index) => ({
                name: `${pokemon.nombre} ${pokemon.apodo} (Nivel ${pokemon.nivel})`,
                value: index
            }))
        }
    ]);

    const pokemonSeleccionado = misPokemons[respuestas.pokemon];
    pokemonSeleccionado.subirNivel();
    puntosPoder -= 10;
    console.log("");
    console.log("===================================================================================");
    console.log(`Has subido de nivel a ${pokemonSeleccionado.nombre} ${pokemonSeleccionado.apodo}.`);
    console.log("===================================================================================");
    console.log("");
}

async function batallaPokemon() {
    console.clear();
    if (misPokemons.length < 2) {
        console.log("Necesitas al menos dos Pokémons para una batalla.");
        return;
    }
    // Selección del primer Pokémon
    const respuesta1 = await inquirer.prompt([
        {
            type: "list",
            name: "pokemon1",
            message: "Selecciona el primer Pokémon:",
            choices: misPokemons.map((pokemon, index) => ({
                name: `${pokemon.nombre} ${pokemon.apodo} (Nivel ${pokemon.nivel})`,
                value: index
            }))
        }
    ]);

    // Selección del segundo Pokémon, excluyendo el primero
    const respuesta2 = await inquirer.prompt([
        {
            type: "list",
            name: "pokemon2",
            message: "Selecciona el segundo Pokémon:",
            choices: misPokemons
                .map((pokemon, index) => ({
                    name: `${pokemon.nombre} ${pokemon.apodo} (Nivel ${pokemon.nivel})`,
                    value: index
                }))
                .filter(choice => choice.value !== respuesta1.pokemon1)
        }
    ]);

    // Selecciona objetos
    const objetosDisponibles = obtenerObjetosDisponibles();
    const objeto1 = await inquirer.prompt([
        {
            type: "list",
            name: "objetos",
            message: "Selecciona los objetos que deseas equipar:",
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
            message: "Selecciona los objetos que deseas equipar:",
            choices: objetosDisponibles.map(objeto => ({
                name: objeto.nombre,
                value: objeto
            }))
        }
    ]);

    const objetoElegido1 = objeto1.objetos;
    const objetoElegido2 = objeto2.objetos;
    let misObjetos = [objetoElegido1, objetoElegido2];

    // Obtener los Pokémon seleccionados
    const pokemon1 = misPokemons[respuesta1.pokemon1];
    const pokemon2 = misPokemons[respuesta2.pokemon2];
    let misPokemonsBatalla = [pokemon1, pokemon2];
    let pokemonesBotBatalla = [];

    // Selección aleatoria de los bots
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

    console.log(`¡Comienza la batalla! Tus Pokémon son: ${pokemon1.nombre} ${pokemon1.apodo} y ${pokemon2.nombre} ${pokemon2.apodo}.`);
    console.log(`Lucharán contra: ${botPokemon.nombre} ${botPokemon.apodo} y ${botPokemon2.nombre} ${botPokemon2.apodo}.`);

    // Selección inicial del Pokémon activo
    let respuestasInicio = await inquirer.prompt([
        {
            type: "list",
            name: "pokemonActivo",
            message: "¿Con cuál Pokémon deseas empezar la batalla?",
            choices: misPokemonsBatalla.map((pokemon, index) => ({
                name: `${pokemon.nombre} ${pokemon.apodo} (Vida: ${pokemon.vida})`,
                value: index
            }))
        }
    ]);
    let pokemonActivo = misPokemonsBatalla[respuestasInicio.pokemonActivo];
    let botActivo = pokemonesBotBatalla[0];

    let turno = 1;
    let huido = false;
    let turnosDesdeHabilidad = 2; // Permite usar en el primer turno (jugador)
    let turnosDesdeHabilidadBot = 2; // Permite usar en el primer turno (bot)

    console.clear();
        while (
        misPokemonsBatalla.some(p => p.vida > 0) &&
        pokemonesBotBatalla.some(p => p.vida > 0) &&
        !huido
    ) {
        
        console.log(`\n--- Turno ${turno} ---`);
        console.log(`Tu Pokémon: ${pokemonActivo.nombre} ${pokemonActivo.apodo} (Vida: ${pokemonActivo.vida})`);
        console.log(`Pokémon Enemigo: ${botActivo.nombre} ${botActivo.apodo} (Vida: ${botActivo.vida})`);

        let accion;
        let opcionValida = false;
        while (!opcionValida) {
            console.log("");
            accion = await inquirer.prompt([
                {
                    type: "list",
                    name: "opcion",
                    message: "¿Qué deseas hacer?",
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
                console.log("La habilidad especial solo se puede usar cada dos turnos. Espera más turnos.");
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
                    console.log("Este Pokémon no tiene ataque definido.");
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
                    console.log("Este Pokémon no tiene habilidad especial definida.");
                    turnosDesdeHabilidad++;
                }
                break;
            case "Huir":
                console.clear();
                console.log("¡Has huido de la batalla!");
                huido = true;
                break;
            case "Cambiar de Pokémon":
                console.clear();
                const cambio = await inquirer.prompt([
                    {
                        type: "list",
                        name: "nuevoActivo",
                        message: "¿A qué Pokémon deseas cambiar?",
                        choices: misPokemonsBatalla
                            .map((pokemon, index) => ({
                                name: `${pokemon.nombre} ${pokemon.apodo} (Vida: ${pokemon.vida})`,
                                value: index
                            }))
                            .filter((choice, idx) => misPokemonsBatalla[idx].vida > 0 && misPokemonsBatalla[idx] !== pokemonActivo)
                    }
                ]);
                pokemonActivo = misPokemonsBatalla[cambio.nuevoActivo];
                console.log("");
                console.log("===================================================================================");
                console.log(`Has cambiado a ${pokemonActivo.nombre} ${pokemonActivo.apodo}.`);
                console.log("===================================================================================");
                console.log("");
                turnosDesdeHabilidad++;
                break;
            case "Usar Objeto":
                console.clear();
                if (misObjetos.length === 0) {
                    console.log("");
                    console.log("===================================================================================");
                    console.log("No tienes objetos para usar. Pierdes el turno");
                    console.log("===================================================================================");
                    console.log("");
                    turnosDesdeHabilidadBot++;
                    break;
                }
                const usoObjeto = await inquirer.prompt([
                    {
                        type: "list",
                        name: "objeto",
                        message: "Selecciona un objeto para usar:",
                        choices: misObjetos.map(objeto => ({
                            name: objeto.nombre,
                            value: objeto
                        }))
                    }
                ]);
                usoObjeto.objeto.usar(pokemonActivo);
                misObjetos = misObjetos.filter(obj => obj !== usoObjeto.objeto); // Eliminar el objeto usado
                botActivo.vida -= usoObjeto.objeto.daño;
                turnosDesdeHabilidad++;
                break;
        }

        // Verificar si el bot fue derrotado y cambiar al siguiente si es necesario
        if (botActivo.vida <= 0) {
            const siguienteBot = pokemonesBotBatalla.find(p => p.vida > 0);
            if (siguienteBot) {
                botActivo = siguienteBot;
                console.log("");
                console.log("===================================================================================");
                console.log(`El Pokémon Enemigo cambia a ${botActivo.nombre} ${botActivo.apodo}.`);
                console.log("===================================================================================");
                console.log("");
            } else {
                console.log("");
                console.log("¡Has derrotado a todos los Pokémons Enemigos!");
                console.log("");
                break;
            }
        }

        // Turno del bot (aleatorio)
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
                            console.log("El Pokémon enemigo no tiene habilidad especial definida.");
                            turnosDesdeHabilidadBot++;
                        }
                    } else {
                        console.log("El bot no puede usar la habilidad especial este turno.");
                        turnosDesdeHabilidadBot++;
                    }
                    break;
                case "Cambiar":
                    const siguienteBot = pokemonesBotBatalla.find(p => p.vida > 0 && p !== botActivo);
                    if (siguienteBot) {
                        botActivo = siguienteBot;
                        console.log("");
                        console.log("===================================================================================");
                        console.log(`El enemigo cambia su Pokémon a: ${botActivo.nombre} ${botActivo.apodo}.`);
                        console.log("===================================================================================");
                        console.log("");
                    }
                    turnosDesdeHabilidadBot++;
                    break;
                case "Usar Objeto":
                    if (misObjetosBot.length > 0) {
                        const objetoBot = misObjetosBot[Math.floor(Math.random() * misObjetosBot.length)];
                        objetoBot.usar(botActivo);
                        misObjetosBot = misObjetosBot.filter(obj => obj !== objetoBot); // Eliminar el objeto usado
                        pokemonActivo.vida -= objetoBot.daño;
                    } else {
                        console.log("");
                        console.log("===================================================================================");
                        console.log("El enemigo no tiene objetos para usar. Pierde el turno.");
                        console.log("===================================================================================");
                        console.log("");
                    }
                    turnosDesdeHabilidadBot++;
                    break;
            }
        }

        // Si tu Pokémon activo muere, cambiar automáticamente al otro si tiene vida
        if (pokemonActivo.vida <= 0) {
            const siguiente = misPokemonsBatalla.find(p => p.vida > 0);
            if (siguiente) {
                pokemonActivo = siguiente;
                console.log("");
                console.log("===================================================================================");
                console.log(`Tu Pokémon activo ha sido derrotado. Cambias a ${pokemonActivo.nombre} ${pokemonActivo.apodo}.`);
                console.log("===================================================================================");
                console.log("");
            } else {
                console.log("");
                console.log("Todos tus Pokémons han sido derrotados.");
                console.log("");
                console.log("¡Has perdido la batalla!");
                console.log("");
                break;
            }
        }

        turno++;
    }

    // Resultado final
    if (huido) {
        console.log("Has huido. El enemigo gana la batalla.");
    } else if (!misPokemonsBatalla.some(p => p.vida > 0)) {
        console.log("Tus Pokémon han sido derrotados. El enemigo gana la batalla.");
    } else if (!pokemonesBotBatalla.some(p => p.vida > 0)) {
        console.log(""); 
        console.log("===================================================================================");
        console.log("¡Felicidades! Has ganado la batalla.");
        console.log("===================================================================================");
        console.log("");
        console.log("Ganaste 20 puntos de poder.");
        console.log("");
        puntosPoder += 20;
    }
}

async function main() {
    
    inquirer.prompt([
        {
            type: "list",
            name: "accion",
            message: "Bienvenido al mundo Pokémon. ¿Qué deseas hacer?",
            choices: [
                "Crear nuevo Pokémon",
                "Mirar Mis Pokémons",
                "Eliminar un Pokémon",
                "Consultar puntos de poder",
                "Subir nivel a un Pokémon",
                "Batalla Pokémon",
                "Salir"
            ]
        }
    ]).then(async answers => {
        switch (answers.accion) {
            case "Crear nuevo Pokémon":
                await crearPokemon();
                break;
            case "Mirar Mis Pokémons":
                await mirarPokemons();
                break;
            case "Eliminar un Pokémon":
                await eliminarPokemon();
                break;
            case "Consultar puntos de poder":
                await consultarPuntosDePoder();
                break;
            case "Subir nivel a un Pokémon":
                await subirNivelPokemon();
                break;
            case "Batalla Pokémon":
                await batallaPokemon();
                break;
            case "Salir":
                console.log("¡Hasta luego!");
                return;
        }
        await main();
    });
}

main();