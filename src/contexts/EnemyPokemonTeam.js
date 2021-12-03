import {createContext, useCallback, useContext, useMemo, useState} from "react";
import {generatePokemonTeam} from "../services/fetch";

const EnemyPokemonTeamContext = createContext()

export function EnemyPokemonTeamProvider (props) {
    const [enemyPokemonTeam, setEnemyPokemonTeam] = useState(JSON.parse(localStorage.getItem('enemyPokemonTeam')) || [])
    const [activeEnemyPokemon, setActiveEnemyPokemon] = useState(JSON.parse(localStorage.getItem('activeEnemyPokemon')) || enemyPokemonTeam[0] || {})

    const generateEnemyTeam = useCallback(async ()=>{
        const team = await generatePokemonTeam()
        console.log(team)
        localStorage.setItem('enemyPokemonTeam', JSON.stringify(team))
        setEnemyPokemonTeam(team)
        setActiveEnemyPokemon(team[0])
    }, [setEnemyPokemonTeam, setActiveEnemyPokemon])

    const updateEnemyTeam = useCallback((newTeam)=>{
        setEnemyPokemonTeam(newTeam)
        localStorage.setItem('enemyPokemonTeam', JSON.stringify(newTeam))
    }, [])

    const api = useMemo(()=>({
        enemyPokemonTeam,
        generateEnemyTeam,
        updateEnemyTeam,
        activeEnemyPokemon,
        setActiveEnemyPokemon,
    }),[activeEnemyPokemon, enemyPokemonTeam, generateEnemyTeam, updateEnemyTeam])

    return <EnemyPokemonTeamContext.Provider value={api}>
        {props.children}
    </EnemyPokemonTeamContext.Provider>
}

export const useEnemyPokemonTeamContext = () => useContext(EnemyPokemonTeamContext)