import './App.css';
import {Navigation} from "./components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {PokemonSection} from "./components/pokemon";
import {PokemonTeamProvider} from "./contexts/PokemonTeamContext";
import {EnemyPokemonTeamProvider} from "./contexts/EnemyPokemonTeam";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function DefaultComp(props) {
    return <div className="App">
        <Navigation/>
        {props.children}
    </div>;
}

function ProvidedApp() {
    return <Switch>
            <Route path={'battle'}>
                <DefaultComp>
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
                <ProvidedApp/>
            </EnemyPokemonTeamProvider>
        </PokemonTeamProvider>
    </Router>
  );
}

export default App;
