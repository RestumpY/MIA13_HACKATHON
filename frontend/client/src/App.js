import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Data from './pages/data/Data';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/data' element={<Data />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
