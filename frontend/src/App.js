import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioLayout from "./components/PortfolioLayout/PortfolioLayout";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
