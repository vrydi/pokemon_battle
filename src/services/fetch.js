function getImage(data) {
    return data.sprites.other["official-artwork"].front_default
}

async function getFourMoves(moves, types) {
    if (moves.length < 1) return []
    if (moves.length <= 4) return moves
    // too hard to implement the effects of the moves in current stage.
    // for (let i = 0; i < 4; i++) {
    //     const move = moves[Math.round(Math.random() * (moves.length - 1))].move
    //     const moveStat = await getMoveInfo(move.url)
    //     result.push({...moveStat, name: move.name, currentPP: moveStat.pp, type: moveStat.type})
    // }
    const typeMoves = [
        {
            type: 'normal',
            move: 'cut'
        },
        {
            type: 'fighting',
            move: 'focus-blast'
        },
        {
            type: 'flying',
            move: 'roost'
        },
        {
            type: 'poison',
            move: 'poison-powder'
        },
        {
            type: 'ground',
            move: 'mud-shot'
        },
        {
            type: 'rock',
            move: 'head-smash'
        },
        {
            type: 'bug',
            move: 'twineedle'
        },
        {
            type: 'ghost',
            move: 'confuse-ray'
        },
        {
            type: 'steel',
            move: 'bullet-punch'
        },
        {
            type: 'fire',
            move: 'ember'
        },
        {
            type: 'water',
            move: 'water-pulse'
        },
        {
            type: 'ice',
            move: 'ice-shard'
        },
        {
            type: 'grass',
            move: 'absorb'
        },
        {
            type: 'electric',
            move: 'spark'
        },
        {
            type: 'psychic',
            move: 'confusion'
        },
        {
            type: 'dragon',
            move: 'dragon-breath'
        },
        {
            type: 'dark',
            move: 'bite'
        },
        {
            type: 'fairy',
            move: 'moonblast'
        }
    ]
    const typeMovesFiltered = []
    types.forEach(type=>{
        typeMovesFiltered.push(typeMoves.find(moveType=>moveType.type === type.type.name))
    })
    const moveArray = ['scratch', 'tail-whip']
    typeMovesFiltered.forEach(move=>moveArray.push(move.move))
    if (moveArray.length <= 3){moveArray.push('sing')}

    return Promise.all(moveArray.map(async move => {
        const moveResult = await getMoveInfo(`https://pokeapi.co/api/v2/move/${move}`)
        // console.log('move result :', moveResult)
        console.log('move result object :', move)
        return {...moveResult, name: move, currentPP: moveResult.pp};
        // console.log('results:', result)
    }))
}

async function getAbility(abilities) {
    const ability = abilities[Math.round(Math.random() * (abilities.length -1))]
    return await getAbilityInfo(ability.ability.url)
}

export async function generatePokemonTeam() {
    const totalPokemon = await getTotalPokemonCount()
    const team = []
    for (let i = 0; i < 6; i++) {
        let fetchedPokemon = undefined
        async function fetch () {
             fetchedPokemon = await fetchOnePokemon(Math.round((Math.random() * (totalPokemon-1))+1))
        }
        await fetch()
            .then(()=>{
            if (fetchedPokemon === undefined) fetch()
        }).then(()=>{
                team.push(fetchedPokemon)
            })
    }
    return team
}

export async function fetchOnePokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    if (data.moves.length < 1) {
        console.log('retry, failed id:', id)
        const totalPokemon = await getTotalPokemonCount()
        return await fetchOnePokemon(Math.round((Math.random() * (totalPokemon-1))+1))
    }
    console.log(data)
    return {
        id: String(data.id),
        name: data.name,
        image: getImage(data),
        ability: await getAbility(data.abilities),
        moves: await getFourMoves(data.moves, data.types),
        stats: {
            currentHealth: data.stats[0],
            health: data.stats[0],
            attack: data.stats[1],
            defense: data.stats[2],
            'special attack': data.stats[3],
            'special defense': data.stats[4],
            speed: data.stats[5],
            statusEffect: ['test']
        },
        types: data.types,
        species: data.species.url,
        gender: await getGender(data.name)
    };
}

async function getGender(name) {
    const response = await  fetch(`https://pokeapi.co/api/v2/gender/?name=${name}`)
    const data = await response.json()
    return data.results[Math.round(Math.random() * (data.results.length-1))].name
}

export async function getTotalPokemonCount() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=0')
    const data = await response.json()
    return data.count
}

export async function getMoveInfo(url){
    let data = undefined
    try {
        const response = await fetch(url)
        if (response.ok){
            data = await response.json()
            console.log(`fetched data ${url}`, data)
            const effect = data.effect_entries.length > 0 ? {'effect chance': data.effect_chance,
                'effect description': data.effect_entries[0].effect} : {}
            return {
                name: data.name,
                accuracy: data.accuracy,
                'damage class': data.damage_class,
                description: data.flavor_text_entries.filter(text=> text['language']['name']==='en')[0],
                pp: data.pp,
                effect: effect,
                power: data.power,
                target: data.target
            }
        } else {
            const responseBody = await response.json()
            console.error((`ERROR: ${responseBody.status} - ${responseBody.error} - ${responseBody.message}`))
        }
    } catch (e) {
        console.error(e)
    }
}

export async function getAbilityInfo(url){
    const response = await fetch(url)
    const data = await response.json().then()
    return {
        name: data.name,
        id: data.id,
        description: data.flavor_text_entries.filter(text=> text['language']['name']==='en')
    }
}