import './App.css';
import {Navigation} from "./components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {PokemonButton} from "./components/pokemon";


function App() {
  return (
    <div className="App">
        <Navigation/>
        <PokemonButton/>
    </div>
  );
}

export default App;
