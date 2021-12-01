import {createContext, useCallback, useContext, useMemo, useState} from "react";
import {generatePokemonTeam} from "../services/fetch";

const EnemyPokemonTeamContext = createContext()

export function EnemyPokemonTeamProvider (props) {
    const [enemyPokemonTeam, setEnemyPokemonTeam] = useState(JSON.parse(localStorage.getItem('enemyPokemonTeam')) || [])

    const generateEnemyTeam = useCallback(async ()=>{
        const team = await generatePokemonTeam()
        console.log(team)
        localStorage.setItem('enemyPokemonTeam', JSON.stringify(team))
        setEnemyPokemonTeam(team)
    }, [setEnemyPokemonTeam])

    const api = useMemo(()=>({
        enemyPokemonTeam,
        generateEnemyTeam
    }),[enemyPokemonTeam, generateEnemyTeam])

    return <EnemyPokemonTeamContext.Provider value={api}>
        {props.children}
    </EnemyPokemonTeamContext.Provider>
}

export const useEnemyPokemonTeamContext = () =>useContext(EnemyPokemonTeamContext)