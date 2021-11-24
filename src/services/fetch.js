function getImage(data) {
    return data.sprites.other["official-artwork"].front_default
}

function getFourMoves(moves){
    let result = []
    for (let i = 0; i < 4; i++) {
        const move = moves[Math.round(Math.random() * moves.length)].move
        result.push({move})
    }
    return result
}

function getAbility(abilities) {
    return abilities[Math.round(Math.random() * abilities.length)].ability
}

export async function fetchOnePokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return {
        id: String(data.id),
        name: data.name,
        image: getImage(data),
        ability: getAbility(data.abilities),
        moves: getFourMoves(data.moves),
        stats: {
            health: data.stats[0],
            attack: data.stats[1],
            defense: data.stats[2],
            special_attack: data.stats[3],
            special_defense: data.stats[4],
            speed: data.stats[5],
        }
    };
}