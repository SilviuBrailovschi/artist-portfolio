import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioGrid from "./components/PortfolioGrid/PortfolioGrid";
import MainLayout from './components/MainLayout/MainLayout';
import Home from './components/Home/Home'

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="portfolio" element={<PortfolioGrid />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

