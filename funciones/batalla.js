
import inquirer from "inquirer";
import chalk from "chalk";
import { misPokemons, pokemonesBot, clasesPokemon, sprites, setPuntosPoder, getPuntosPoder, obtenerObjetosDisponibles } from "./inicializacion_objetos.js";
import { mostrarBarraVida } from "./mostrarBarraVida.js";

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
        const puntosPoder = getPuntosPoder();
        console.log(""); 
        console.log(chalk.green.bold("🎉 ¡Felicidades! Has ganado la batalla."));
        console.log("");
        console.log(chalk.yellow("✨ Ganaste 20 puntos de poder."));
        console.log("");
        setPuntosPoder(puntosPoder + 20);
    }
    misPokemons.forEach(p => {
    p.vida = p.maxVida;
})};

export { batallaPokemon };