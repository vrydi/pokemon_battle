import {Button} from "react-bootstrap";
import {useState} from "react";
import {fetchOnePokemon} from "../services/fetch";

export function PokemonButton () {
    const [pokemon, setPokemon] = useState({})

    const getPokemon = async () => {
        const fetchedPokemon = await fetchOnePokemon(654)
        setPokemon(fetchedPokemon)
    }

    return <>
        <Button onClick={()=>getPokemon()}>get pokemon</Button>
        <Button onClick={()=>console.log(pokemon)}>log</Button>
    </>
}