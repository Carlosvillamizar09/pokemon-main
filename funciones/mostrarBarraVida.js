import chalk from "chalk";

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

export { mostrarBarraVida };