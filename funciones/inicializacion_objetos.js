import Pikachu from "../clases/Pikachu.js";
import Mankey from "../clases/Mankey.js";
import Nidorino from "../clases/Nidorino.js";
import Sandslash from "../clases/Sandslash.js";
import Squirtle from "../clases/Squirtle.js";
import Rattata from "../clases/Rattata.js";
import Bulbasaur from "../clases/Bulbasaur.js";
import Raichu from "../clases/Raichu.js";
import Dildo from "../clases/Dildo.js";
import Espada from "../clases/Espada.js";
import Insulto from "../clases/Insulto.js";
import Machete from "../clases/Machete.js";
import Oz from "../clases/Oz.js";
import Pila from "../clases/Pila.js";

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

function getPuntosPoder() {
    return puntosPoder;
}

function setPuntosPoder(nuevoValor) {
    puntosPoder = nuevoValor;
}

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

export { sprites, misPokemons, pokemonesBot, clasesPokemon, puntosPoder, getPuntosPoder, setPuntosPoder, obtenerObjetosDisponibles };