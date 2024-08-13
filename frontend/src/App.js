import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioGrid from "./components/PortfolioGrid";
import PortfolioItem from "./components/PortfolioItem";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioGrid />} />
          <Route path="/portfolio-item/:id" element={<PortfolioItem />} />
          {/* Additional routes */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
