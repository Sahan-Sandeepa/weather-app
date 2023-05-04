import { Router, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
function App() {
  return (
    <BrowserRouter>
    <Router>
        <Route exact path="/" component={Home} />
        {/* <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} /> */}
    </Router>
    </BrowserRouter>
  );
}

export default App;
