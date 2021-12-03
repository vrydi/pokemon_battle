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
        <Route path={'/battle'}>
            <DefaultComp>
                <BattleSection/>
            </DefaultComp>
        </Route>
        <Route path={'/'}>
            <DefaultComp>
                <PokemonSection/>
            </DefaultComp>
        </Route>
        </Switch>
}

function App() {
  return (
    <Router>
        <PokemonTeamProvider>
            <EnemyPokemonTeamProvider>
                <BagProvider>
                    <BattleProvider>
                        <ProvidedApp/>
                    </BattleProvider>
                </BagProvider>
            </EnemyPokemonTeamProvider>
        </PokemonTeamProvider>
    </Router>
  );
}

export default App;
