import {
    Badge, Button,
    Card,
    Col, Collapse,
    Container, ListGroup, ListGroupItem, Modal,
    OverlayTrigger,
    ProgressBar,
    Row,
    Tooltip
} from "react-bootstrap";
import {usePokemonTeamContext} from "../contexts/PokemonTeamContext";
import {useEffect, useState} from "react";
import {GetGender} from "./generalComponents/Cards";
import {MDBIcon} from "mdbreact";
import {useEnemyPokemonTeamContext} from "../contexts/EnemyPokemonTeam";
import {useHistory} from "react-router-dom";
import {useBagContext} from "../contexts/bagContext";

export function BattleSection() {
    const {pokemonTeam} = usePokemonTeamContext()
    const {enemyPokemonTeam} = useEnemyPokemonTeamContext()
    const [activePokemon, setActivePokemon] = useState(JSON.parse(localStorage.getItem('activePokemon')) || pokemonTeam[0])
    const [activeEnemyPokemon, setActiveEnemyPokemon] = useState(enemyPokemonTeam[0])
    const [pokeMenu, setPokeMenu] = useState('start')

    return <section>
        <Container id={'battle'} className={'p-0 mt-5'}>
            {pokeMenu === 'pokemon' ? <PokemonChangeMenu pokemonTeam={pokemonTeam}
                                                         activePokemon={activePokemon}
                                                         setActivePokemon={setActivePokemon}
                                                         setPokeMenu={setPokeMenu}/> :
                pokeMenu === 'bag' ? <BagScreen setPokeMenu={setPokeMenu}/> :
                    <>
                        <div className={'d-flex battle-screen'}>
                            <Col lg={6} className={'left-field'}>
                                <Row className={'mt-3'}>
                                    <NameSection pokemon={activeEnemyPokemon}/>
                                    <div className={'position-relative w-75 mx-auto card-arrow'}/>
                                </Row>
                                <Row>
                                    <img className={'w-75 mt-5 poke-image mirror'} src={activePokemon.image} alt=""/>
                                </Row>
                                <Row style={{height: '0'}}>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/battle_podia.png?alt=media&token=21348cd1-ea50-4ea2-ab4c-c9d4ba6d6042"
                                        alt=""
                                        className={'w-75 position-relative poke-stadia'}
                                    />
                                </Row>
                            </Col>
                            <Col lg={6} className={'right-field'}>
                                <Row>
                                    <img className={'w-75 mt-5 ms-auto poke-image'}
                                         src={activeEnemyPokemon.image}
                                         alt=""/>
                                </Row>
                                <Row style={{height: '25px'}}>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/battle_podia.png?alt=media&token=21348cd1-ea50-4ea2-ab4c-c9d4ba6d6042"
                                        alt=""
                                        className={'w-75 position-relative ms-auto poke-stadia'}
                                    />
                                </Row>
                                <Row>
                                    <NameSection pokemon={activePokemon} className={'ms-auto'} friend={true}/>
                                    <div className={'position-relative w-75 mx-auto card-arrow mirror'}/>
                                </Row>
                            </Col>
                        </div>
                        {pokeMenu === 'start' && <PokeOptions activePokemon={activePokemon} setPokeMenu={setPokeMenu}/>}
                        {pokeMenu === 'battle' &&
                        <PokeBattleButton moves={activePokemon.moves} setPokeMenu={setPokeMenu}/>}
                    </>
            }
        </Container>
    </section>
}

function isNotEmpty(object) { for(const i in object) { return true; } return false; }

function BagScreen(props) {
    const {bag} = useBagContext()
    const [target, setTarget] = useState({})
    const [targetItem, setTargetItem] = useState({})
    const [targetMove, setTargetMove] = useState({})
    const [modalShow, setModalShow] = useState(false)
    const {pokemonTeam, updateTeam} = usePokemonTeamContext()
    const {setPokeMenu} = props

    useEffect(()=>{
        if (isNotEmpty(target) && isNotEmpty(targetItem)){
            console.log(target)
            console.log(targetItem)
            // eslint-disable-next-line default-case
            switch (targetItem.name) {
                case 'ether':
                    pokemonTeam.find(pokemon=>pokemon.id===target.id).moves.find(move=>move.name===targetMove.name).currentPP = targetMove.currentPP + 10 > targetMove.pp ? targetMove.currentPP = targetMove.pp : targetMove.currentPP += targetMove.pp
                    bag.find(item=>item.name==='ether').amount--
                    setTarget({})
                    setTargetItem({})
                    setTargetMove({})
                    updateTeam(pokemonTeam)
                    break
                case 'fresh water':
                    pokemonTeam.find(pokemon=>pokemon.id===target.id).stats.currentHealth = target.stats.currentHealth + 30 > target.stats.health ? target.stats.currentHealth = target.stats.health : target.stats.currentHealth += 30
                    bag.find(item=>item.name==='fresh water').amount--
                    setTarget({})
                    setTargetItem({})
                    setTargetMove({})
                    updateTeam(pokemonTeam)
                    break
                case 'full heal':
                    pokemonTeam.find(pokemon=>pokemon.id===target.id).stats.statusEffect = target.stats.statusEffect.includes('fainted') ? ['fainted'] : []
                    bag.find(item=>item.name==='full heal').amount--
                    setTarget({})
                    setTargetItem({})
                    setTargetMove({})
                    updateTeam(pokemonTeam)
                    break
                case 'full restore':
                    pokemonTeam.find(pokemon=>pokemon.id===target.id).stats.statusEffect = target.stats.statusEffect.includes('fainted') ? ['fainted'] : []
                    pokemonTeam.find(pokemon=>pokemon.id===target.id).stats.currentHealth = target.stats.health
                    bag.find(item=>item.name==='full restore').amount--
                    setTarget({})
                    setTargetItem({})
                    setTargetMove({})
                    updateTeam(pokemonTeam)
                    break
                case 'revive':
                    pokemonTeam.find(pokemon=>pokemon.id===target.id).stats.statusEffect.filter(status=>status!=='fainted')
                    pokemonTeam.find(pokemon=>pokemon.id===target.id).stats.currentHealth = Math.round(target.stats.health / 2)
                    bag.find(item=>item.name==='revive').amount--
                    setTarget({})
                    setTargetItem({})
                    setTargetMove({})
                    updateTeam(pokemonTeam)
                    break
            }
        }
    }, [bag, pokemonTeam, target, targetItem, targetMove, updateTeam])

    return <Container>
        <PokeItemChooseModal show={modalShow}
                             onHide={()=>setModalShow(false)}
                             item={targetItem}
                             setTarget={setTarget}
                             setModalShow={setModalShow}
                             setTargetMove={setTargetMove}
                             targetMove={targetMove}/>
        <Row lg={2} className={'g-4'}>
            {bag.map((item, i) => {
                return <BagCard item={item} key={i} setModalShow={setModalShow} setTargetItem={setTargetItem}/>
            })}
        </Row>
        <button onClick={() => setPokeMenu('start')} className={'poke-option-button w-100 btn bg-light'}>Back</button>
    </Container>
}

function BagCard(props) {
    const {item, setModalShow, setTargetItem} = props
    const [open, setOpen] = useState(false)


    function consumeItem(item) {
        setTargetItem(item)
        setModalShow(true)
    }

    return <>
        {item.amount < 1 ? null :
            <Col aria-controls={item.name} aria-expanded={open} onClick={() => setOpen(!open)}>
                <Card className={'p-3'}>
                    <Row>
                        <Col lg={10}><h4 className={'text-capitalize'}>{item.name}</h4></Col>
                        <Col lg={2}><Badge pill className={'p-2'}>{item.amount}</Badge></Col>
                    </Row>
                    <Collapse in={open}>
                        <div id={item.name}>
                            <p>{item.description}</p>
                            <div className={'w-50 mx-auto'}>
                                <Button className={'text-center w-100 rounded-pill'}
                                        onClick={() => consumeItem(item)}>use</Button>
                            </div>
                        </div>
                    </Collapse>
                </Card>
            </Col>
        }
    </>
}

function PokeItemChooseModal(props) {
    const {pokemonTeam} = usePokemonTeamContext()
    const {setModalShow, setTarget, setTargetMove, targetMove, item} = props

    function selectTarget() {
        if ((item.name === 'ether' && isNotEmpty(targetMove)) || item.name !== 'ether'){
            setModalShow(false)
            console.log('move / target selected')
        }

    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            pokemonTeam={pokemonTeam}
            setTarget={setTarget}
            setModalShow={setModalShow}
            setTargetMove={setTargetMove}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Choose what pokemon you'd want to apply the item to.
                </Modal.Title>
            </Modal.Header>
            <div className={'mx-3'}>
                <h4 className={'text-capitalize'}>{props.item.name}</h4>
                <p>{props.item.description}</p>
                <Row lg={2} className={'g-4'}>
                    {pokemonTeam.map((p, i)=>{ return <Col>
                        <Card key={i}>
                            <Card.Header><span className={'text-capitalize'}>{p.name}</span></Card.Header>
                            <Row>
                                <Col lg={4}>
                                    <img src={p.image} className={'w-100'} alt=""/>
                                </Col>
                                <Col className={' me-3'}>
                                    <div className={'d-flex my-3'}>
                                        {p.stats.statusEffect.map((effect, i) => {
                                            return <PokeStatus key={i} status={effect}/>
                                        })}
                                    </div>
                                    <div>
                                        <div className={'w-100 my-auto d-flex rounded text-light ps-2 bg-green'}>
                                            <span className={'text-yellow'}>HP</span>
                                            <div className={'w-100 my-auto mx-2'}>
                                                <ProgressBar now={p.stats.currentHealth.base_stat} min={0}
                                                             max={p.stats.health.base_stat} variant={'success'}/>
                                            </div>
                                        </div>
                                        <div className={'text-right me-3'}>
                                            {`${p.stats.currentHealth.base_stat} / ${p.stats.health.base_stat}`}
                                        </div>
                                    </div>
                                </Col>
                                {props.item.name === 'ether' ? <Container className={'mx-auto my-3 w-75'}>
                                    <ListGroup>
                                        {p.moves.map((move, i)=>{
                                            return <ListGroupItem key={i} className={'d-flex justify-content-between'} onClick={()=>{setTargetMove(move); setTarget(p)}} active={move.name === targetMove.name}>
                                                <div className={'font-weight-bold text-capitalize'}>{move.name}</div>
                                                <div className={'text-muted'}>{`${move.currentPP}/${move.pp}`}</div>
                                            </ListGroupItem>
                                        })}
                                    </ListGroup>
                                </Container>
                                : <Button className={'w-50 mx-auto rounded-pill'} onClick={()=>{selectTarget(); setTarget(p)}}>Select Pokemon</Button>
                                }
                            </Row>
                        </Card>
                    </Col>
                    })}
                </Row>
            </div>
            <Modal.Footer>
                {item.name === 'ether' && <Button className={'w-50 mx-auto rounded-pill'} onClick={()=>selectTarget()} variant={"success"}>Select Move</Button>}
                <Button onClick={props.onHide}>Back</Button>
            </Modal.Footer>
        </Modal>
    );
}

function PokemonChangeMenu(props) {
    const {pokemonTeam, activePokemon, setActivePokemon, setPokeMenu} = props
    return <Container>
        <Row lg={2} className={'g-4'}>
            {pokemonTeam.map((pokemon, i) => <PokeChangeFrames key={i}
                                                               activePokemon={activePokemon.name === pokemon.name}
                                                               setActivePokemon={setActivePokemon}
                                                               setPokeMenu={setPokeMenu}
                                                               pokemon={pokemon}/>)}
        </Row>
        <div className={'mt-3'}>
            <button onClick={() => setPokeMenu('start')} className={'poke-option-button w-100 btn bg-light'}>Back
            </button>
        </div>
    </Container>
}

function PokeChangeFrames(props) {
    const {activePokemon, pokemon, setActivePokemon, setPokeMenu} = props
    const gender = GetGender(pokemon.gender)
    console.log(pokemon)
    const changePokemon = (pokemon) => {
        if (!pokemon.stats.statusEffect.includes('fainted')) {
            localStorage.setItem('activePokemon', JSON.stringify(pokemon))
            setActivePokemon(pokemon)
            setPokeMenu('start')
        }
    }
    return <Col>
        <Card
            className={activePokemon ? 'border-3 border-primary bg-yellow' : pokemon.stats.statusEffect.includes('fainted') ? 'fainted' : ''}
            onClick={() => changePokemon(pokemon)}>
            <Row className={'mt-2'}>
                <Col lg={4}>
                    <img src={pokemon.image} alt="" style={{height: '10rem'}}/>
                </Col>
                <Col lg={8}>
                    <div className={'text-capitalize h3'}><span className={'text-capitalize h4'}>{pokemon.name} <span
                        className={'ms-2 text-primary'}><MDBIcon icon={gender}/></span></span></div>
                    <div>{pokemon.types.map((type, i) => {
                        return <span key={i} className={'text-capitalize'}>{`${type.type.name} `}</span>
                    })}</div>
                    <Row lg={2} style={{height: '70px'}} className={'me-2'}>
                        <Col className={'d-flex'}>
                            <div className={'align-self-end'}>
                                {pokemon.stats.statusEffect.map((effect, i) => {
                                    return <PokeStatus key={i} status={effect}/>
                                })}
                            </div>
                        </Col>
                        <Col>
                            <div className={'w-100 my-auto d-flex rounded text-light ps-2 bg-green'}>
                                <span className={'text-yellow'}>HP</span>
                                <div className={'w-100 my-auto mx-2'}>
                                    <ProgressBar now={pokemon.stats.currentHealth.base_stat} min={0}
                                                 max={pokemon.stats.health.base_stat} variant={'success'}/>
                                </div>
                            </div>
                            <div className={'text-right me-3'}>
                                {`${pokemon.stats.currentHealth.base_stat} / ${pokemon.stats.health.base_stat}`}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    </Col>
}

const getEffectColour = (effect) => {
    switch (effect) {
        case 'fainted':
            return 'danger'
        case 'burn':
            return 'warning'
        case 'confusion':
        case 'paralysed':
            return 'secondary'
        case 'poison' :
            return 'primary'
        default:
            return 'info'
    }
}

function PokeStatus(props) {
    const {status} = props
    const effect = getEffectColour(status)
    return <Badge className={'p-2'} pill bg={effect}>{status}</Badge>
}

function PokeOptions(props) {
    const {activePokemon, setPokeMenu} = props
    const [message, setMessage] = useState(`What will ${activePokemon.name} do?`)

    return <RoundedDiv color={'bg-green'}>
        <div className={'p-2 battle-option-screen m-0 d-flex'}>
            <PokeMessage message={message}/>
            <Col lg={6} className={'m-0 bg-beige row rounded-3'}>
                <PokeStartButton buttons={['fight', 'pokemon', 'bag', 'flee']} setMessage={setMessage}
                                 setPokeMenu={setPokeMenu} pokemon={activePokemon}/>
            </Col>
        </div>
    </RoundedDiv>
}

function RoundedDiv(props) {
    const {color, children} = props
    return <div className={`rounded-3 p-1 ${color}`}>
        {children}
    </div>
}

function PokeMessage(props) {
    const {message} = props
    return <Col lg={6} className={'m-0'}>
        <RoundedDiv color={'bg-green'}>
            <RoundedDiv color={'bg-yellow'}>
                <RoundedDiv color={'bg-green'}>
                    <div className={'bg-beige battle-option-text p-2'}>
                        {message}
                    </div>
                </RoundedDiv>
            </RoundedDiv>
        </RoundedDiv>
    </Col>
}

function PokeBattleButton(props) {
    const {setPokeMenu, moves} = props
    console.log(moves)

    return <RoundedDiv color={'bg-green'}>
        <Container>
            <Row col={2}>
                {moves.map((move, i) => <PokeMoveButton key={i} move={move}/>)}
            </Row>
            <div>
                <button onClick={() => setPokeMenu('start')} className={'poke-option-button w-100 btn bg-light'}>Back
                </button>
            </div>
        </Container>
    </RoundedDiv>
}

function PokeMoveButton(props) {
    const {move} = props
    console.log(move)
    return <Col>
        <OverlayTrigger overlay={
            <Tooltip>
                {move.description[0].flavor_text}
            </Tooltip>
        } placement={'top'} defaultShow={false} delay={500}>
            <button className={'poke-option-button w-100 btn bg-light'}>
                <div className={'font-weight-bold'}>{move.name}</div>
                <div className={'text-muted'}>{`${move.currentPP}/${move.pp}`}</div>
            </button>
        </OverlayTrigger>
    </Col>
}

function PokeStartButton(props) {
    const {buttons, setMessage, setPokeMenu, pokemon} = props
    const history = useHistory()

    const click = (button) => {
        switch (button) {
            case 'fight' :
                if (!pokemon.stats.statusEffect.includes('fainted')) {
                    setPokeMenu('battle')
                }
                break
            case 'pokemon':
                setPokeMenu('pokemon')
                break
            case 'bag':
                setPokeMenu('bag')
                break
            case 'flee':
                setMessage('you have fled')
                setTimeout(function () {
                    history.push('/')
                }, 1000)
                break
            default:
                setPokeMenu('start')
        }
    }
    return <>
        {buttons.map((button, i) => {
            return <Col lg={6} key={i}>
                <button onClick={() => click(button)}
                        className={`poke-option-button w-100 btn ${button}`}>{button}</button>
            </Col>
        })}
    </>
}

function NameSection(props) {
    const {pokemon, friend, className} = props
    const gender = GetGender(pokemon.gender)
    return <div>
        <Card className={className + ' px-3 py-1 pokemon-card bg-beige'}>
            <Card.Title><span className={'text-capitalize h4'}>{pokemon.name} <span
                className={'ms-2 text-primary'}><MDBIcon icon={gender}/></span></span></Card.Title>
            <div className={'d-flex justify-content-between'}>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/pokemon-battle-f40d2.appspot.com/o/Poke-Ball-32.png?alt=media&token=9513774d-f6e3-474b-988f-490c7f58ff08"
                    alt=""/>
                <div className={'w-75 my-auto d-flex rounded text-light ps-2 bg-green'}>
                    <span className={'text-yellow'}>HP</span>
                    <div className={'w-100 my-auto mx-2'}>
                        <ProgressBar now={pokemon.stats.currentHealth.base_stat} min={0}
                                     max={pokemon.stats.health.base_stat} variant={'success'}/>
                    </div>
                </div>
            </div>
            <Row lg={2} className={'mt-1'}>
                <Col lg={6}>
                    {pokemon.stats.statusEffect.map((effect, i) => {
                        return <PokeStatus key={i} status={effect}/>
                    })}
                </Col>
                <Col lg={6}>
                    {friend && <div className={'text-right'}>
                        {`${pokemon.stats.currentHealth.base_stat} / ${pokemon.stats.health.base_stat}`}
                    </div>}
                </Col>
            </Row>
        </Card>
    </div>
}