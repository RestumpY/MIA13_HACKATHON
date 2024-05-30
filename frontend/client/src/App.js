import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Data from './pages/data/Data';
import Visualisations from './pages/visualization/Visualization';
import Analysis from './pages/analysis/Analysis';
import Predictions from './pages/Predictions/predictions';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/data' element={<Data />} /> 
              <Route path='/visualisations' element={<Visualisations />} /> 
              <Route path='/analysis' element={<Analysis />} /> 
              <Route path='/predictions' element={<Predictions />} /> 
          </Routes>
      </Router>
    </div>

  );
}

export default App;
