// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PortfolioGrid from "./components/PortfolioGrid/PortfolioGrid";
//
// function App() {
//   return (
//     <div className="app">
//       <Router>
//         <Routes>
//           <Route path="/" element={<PortfolioGrid />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }
//
// export default App;
// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioGrid from "./components/PortfolioGrid/PortfolioGrid";
import MainLayout from './components/MainLayout/MainLayout'; // Import the layout component

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<PortfolioGrid />} />
                        {/* Add other routes here as children of MainLayout */}
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

