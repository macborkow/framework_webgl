import "./App.css";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Forwarder from "./components/Forwarder";
import Framework from "./components/Framework";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Forwarder />
        </Route>
        <Route exact path="/framework/">
          <Link to="framework/play">play</Link>
        </Route>
        <Route path="/framework/play">
          <Framework />
        </Route>
        <Route path="/:whatever">
          <p>page not found</p>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
