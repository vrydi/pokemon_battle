import './App.css';
import {Navigation} from "./components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {PokemonSection} from "./components/pokemon";
import {PokemonTeamProvider} from "./contexts/PokemonTeamContext";


function ProvidedApp() {
    return <div className="App">
        <Navigation/>
        <PokemonSection/>
    </div>;
}

function App() {
  return (
    <PokemonTeamProvider>
        <ProvidedApp/>
    </PokemonTeamProvider>
  );
}

export default App;
