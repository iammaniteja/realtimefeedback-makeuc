import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GetForm from "./components/Form/getForm";
import Landing from "./components/Landing";
import Survey from "./components/survey/survey";

function App() {
  return (
    <div>
      <Router>
      <Switch>
        <Route path="/admin" component={Survey} />
        <Route path="/guest" component={GetForm} />
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
