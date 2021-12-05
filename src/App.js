import './App.css';
import {Navigation} from "./components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {PokemonSection} from "./components/pokemon";
import {PokemonTeamProvider} from "./contexts/PokemonTeamContext";
import {EnemyPokemonTeamProvider} from "./contexts/EnemyPokemonTeam";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {BattleSection} from "./components/Battle";
import {BagProvider} from "./contexts/bagContext";
import {BattleProvider} from "./contexts/BattleContext";

function DefaultComp(props) {
    return <div className="App">
        <Navigation/>
        {props.children}
    </div>;
}

function ProvidedApp() {
    return <Switch>
        <Route path={'/pokemon_battle/battle'}>
            <DefaultComp>
                <BattleSection/>
            </DefaultComp>
        </Route>
        <Route path={'/pokemon_battle/'}>
            <DefaultComp>
                <PokemonSection/>
            </DefaultComp>
        </Route>
    </Switch>
}

function App() {
    return (
        <Router>
            <EnemyPokemonTeamProvider>
                <PokemonTeamProvider>
                    <BagProvider>
                        <BattleProvider>
                            <ProvidedApp/>
                        </BattleProvider>
                    </BagProvider>
                </PokemonTeamProvider>
            </EnemyPokemonTeamProvider>
        </Router>
    );
}

export default App;
