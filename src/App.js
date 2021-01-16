import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Library from "./pages/Library";
import Games from "./pages/Games";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router basename="/games">
        <Navbar/>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/library" component={Library}></Route>
        <Route path="/game" component={Games}></Route>
      </Router>
    </div>
  );
}

export default App;
