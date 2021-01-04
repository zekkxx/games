import { BrowserRouter as Router, Route} from "react-router-dom";
import About from "./pages/About";
import Navbar from "./components/Navbar"
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/">Homepage</Route>
      </Router>
    </div>
  );
}

export default App;
