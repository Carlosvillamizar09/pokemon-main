

class PokemonManager {
    constructor() {
        if (PokemonManager.instance) {
            return PokemonManager.instance;
        }
        this.pokemons = [];
        PokemonManager.instance = this;
    }

    addPokemon(pokemon) {
        this.pokemons.push(pokemon);
    }

    getAllPokemons() {
        return this.pokemons;
    }
}

const manager1 = new PokemonManager();
manager1.addPokemon({ name: 'Pikachu', type: 'Electric' });

const manager2 = new PokemonManager();
manager2.addPokemon({ name: 'Charmander', type: 'Fire' });

console.log(manager1.getAllPokemons());
console.log(manager2.getAllPokemons());