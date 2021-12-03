import {createContext, useCallback, useContext, useMemo, useState} from "react";
import {usePokemonTeamContext} from "./PokemonTeamContext";
import {useEnemyPokemonTeamContext} from "./EnemyPokemonTeam";
import {isNotEmpty} from "../components/Battle";

const BattleContext = createContext()

export function BattleProvider(props) {
    const {pokemonTeam, updateTeam, activePokemon, setActivePokemon} = usePokemonTeamContext()
    const {enemyPokemonTeam, updateEnemyTeam, activeEnemyPokemon, setActiveEnemyPokemon} = useEnemyPokemonTeamContext()

    const firstAttack = useCallback((friendMove, enemyMove) => {
        console.log(enemyMove)
        if (friendMove.name === 'bullet-punch' || friendMove.name === 'ice-shard') return 'friend'
        if (enemyMove.name === 'bullet-punch' || enemyMove.name === 'ice-shard') return 'enemy'
        return activePokemon.stats.speed.base_stat > activeEnemyPokemon.stats.speed.base_stat ? 'friend' :
            activePokemon.stats.speed.base_stat < activeEnemyPokemon.stats.speed.base_stat ? 'enemy' :
                Math.random() >= 0.5 ? 'friend' : 'enemy'
    }, [activeEnemyPokemon.stats.speed.base_stat, activePokemon.stats.speed.base_stat])

    const battle = useCallback( (friendMove) => {
        const enemyMove = activeEnemyPokemon.moves[Math.round(Math.random()*3)]
        console.log('friend move :', friendMove)
        console.log('enemy move :', enemyMove)
        if (!isNotEmpty(friendMove)) return null
        console.log()
        const firsAttack = firstAttack(friendMove, enemyMove)
        console.log('firstAttack :', firsAttack)
    }, [activeEnemyPokemon.moves, firstAttack])

    const api = useMemo(()=>({
        battle
    }), [ battle])

    return <BattleContext.Provider value={api}>
        {props.children}
    </BattleContext.Provider>
}

export const useBattleContext = () => useContext(BattleContext)