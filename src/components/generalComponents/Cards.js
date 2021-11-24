import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

export function PokemonCard (props) {
    const {pokemon} = props
    return <>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant={'top'}
                      src={pokemon.image}/>
            <Card.Body>
                <Card.Title>
                    <h3 className={'text-capitalize'}>{pokemon.name}</h3>
                </Card.Title>
                <h5>Moves : </h5>
                <ListGroup className={'list-group-flush'}>
                    {pokemon.moves.map((m, i)=>{
                        return <ListGroupItem key={i}>{m.move.name}</ListGroupItem>
                    })}
                </ListGroup>
                <Card.Text>
                    <span className={'h5'}>Ability</span> : {pokemon.ability.ability.name}
                </Card.Text>
                <h5>Stats :</h5>
                <ListGroup className={'list-group-flush'}>
                    {Object.entries(pokemon.stats).map((s, i)=>{
                        return <ListItemStat name={s[0]} value={s[1]} key={i}/>
                    })}
                </ListGroup>
            </Card.Body>
        </Card>
    </>
}

function ListItemStat(props){
    const {name, value} = props;
    return <ListGroupItem className={'text-capitalize'}>{`${name} : ${value.base_stat}`}</ListGroupItem>
}