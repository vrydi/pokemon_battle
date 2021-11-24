import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {useState} from "react";

export function PokemonCard (props) {
    const {pokemon} = props
    const [open, setOpen] = useState(false)
    return <>
        <Card>
            <Card.Img variant={'top'}
                      src={pokemon.image}/>
            <Card.Body>
                <Card.Title>
                    <h2 className={'text-capitalize'}>{pokemon.name}</h2>
                    {pokemon.types.map((t, i)=> <small className={'text-muted'} key={i}>{t.type.name} </small>)}
                </Card.Title>
                {open &&
                    <div>
                        <h5>Moves : </h5>
                        <ListGroup className={'list-group-flush'}>
                            {pokemon.moves.map((m, i)=>{
                                return <ListGroupItem key={i}>{m.move.name}</ListGroupItem>
                            })}
                        </ListGroup>
                        <Card.Text>
                            {pokemon.ability && <span><span className={'h5'}>Ability</span> : {pokemon.ability.ability.name}</span>}

                        </Card.Text>
                        <h5>Stats :</h5>
                        <ListGroup className={'list-group-flush'}>
                            {Object.entries(pokemon.stats).map((s, i)=>{
                                return <ListItemStat name={s[0]} value={s[1]} key={i}/>
                            })}
                        </ListGroup>
                    </div>
                }
                <Button className={'my-2 w-100'} onClick={()=>setOpen(!open)}>{open ? 'Hide extra info' : 'Show extra info'}</Button>
            </Card.Body>
        </Card>
    </>
}

function ListItemStat(props){
    const {name, value} = props;
    return <ListGroupItem className={'text-capitalize'}>{`${name} : ${value.base_stat}`}</ListGroupItem>
}