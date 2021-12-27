import './App.css';
import Home from './Components/Home';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Recipes from './Components/Recipes';
import Ingredients from './Components/Ingredients';


let test = "TEST";

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/ingredients" element={<Ingredients />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
