import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CityDetail from './pages/CityDetail';

function App() {
  return (
    // Initialize the routing functionality using BrowserRouter
    <BrowserRouter>
      {/* Define the main body of the web page */}

      {/* Define the main content area of the web page */}
      <main>
        {/* Define the routes for the web page using the Routes component */}
        <Routes>

          {/* Define the route for the Home page using the Home component */}
          <Route path="/" element={<Home />} />

          {/* Define the route for the CityDetail page using the CityDetail component */}
          <Route path='/:cityId' element={<CityDetail />} />

        </Routes>
      </main>

    </BrowserRouter>

  );
}

export default App;
