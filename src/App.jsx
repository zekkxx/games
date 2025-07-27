import './App.css';

import { Route, BrowserRouter as Router } from "react-router-dom";

import About from "./pages/About";
import Games from "./pages/Games";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Navbar from "./components/Navbar";
import Test from "./pages/Test";

function App() {
  return (
    <div className="App">
      <Router basename="/games">
        <Navbar/>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/library" component={Library} />
        <Route path="/game" component={Games} />
        <Route path="/test" component={Test} />
      </Router>
    </div>
  );
}

export default App;
