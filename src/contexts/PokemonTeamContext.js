import {createContext, useCallback, useContext, useMemo, useState} from "react";
import {generatePokemonTeam} from "../services/fetch";

const PokemonTeamContext = createContext()

export function PokemonTeamProvider (props) {
    const [pokemonTeam, setPokemonTeam] = useState(JSON.parse(localStorage.getItem('pokemonTeam')) || [])
    const [tries, setTries] = useState(localStorage.getItem('tries') || 3)

    const generateTeam = useCallback(async ()=>{
        const team = await generatePokemonTeam()
        console.log(team)
        localStorage.setItem('pokemonTeam', JSON.stringify(team))
        setTries(tries-1)
        localStorage.setItem('tries', tries)
        setPokemonTeam(team)
    }, [setPokemonTeam, tries, setTries])

    const api = useMemo(()=>({
        pokemonTeam,
        generateTeam,
        tries
    }),[pokemonTeam, generateTeam, tries])

    return <PokemonTeamContext.Provider value={api}>
        {props.children}
    </PokemonTeamContext.Provider>
}

export const usePokemonTeamContext = () =>useContext(PokemonTeamContext)