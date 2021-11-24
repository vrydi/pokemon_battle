import {Button} from "react-bootstrap";
import {useState} from "react";
import {fetchOnePokemon, getTotalPokemonCount} from "../services/fetch";
import {PokemonCard} from "./generalComponents/Cards";

export function PokemonButton () {
    const [pokemon, setPokemon] = useState({})

    const getPokemon = async () => {
        const totalPokemon = await getTotalPokemonCount()
        const fetchedPokemon = await fetchOnePokemon(Math.round(Math.random() * totalPokemon))
        console.log(fetchedPokemon)
        setPokemon(fetchedPokemon)
    }

    return <>
        <Button onClick={()=>getPokemon()}>get pokemon</Button>
        <Button onClick={()=>console.log(pokemon)}>log</Button>
        {pokemon.name && <PokemonCard pokemon={pokemon}/>}
    </>
}