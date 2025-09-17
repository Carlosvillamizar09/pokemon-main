import chalk from "chalk";
import { puntosPoder } from "./inicializacion_objetos.js";

async function consultarPuntosDePoder() {
    console.clear();
    console.log("");
    console.log(chalk.magenta.bold("🔋 Puntos de poder:"));
    console.log(`Tienes ${chalk.yellow(puntosPoder)} puntos de poder.`);
    console.log("");
}

export { consultarPuntosDePoder };