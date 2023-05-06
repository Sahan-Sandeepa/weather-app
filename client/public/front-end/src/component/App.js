import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CityDetail from './pages/CityDetail';

function App() {
  return (
    <BrowserRouter>
      <body>
        <main>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path='/:cityId' element={<CityDetail />} />

          </Routes>
        </main>
      </body>

    </BrowserRouter>
  );
}

export default App;
