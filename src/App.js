import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GetForm from "./components/Form/getForm";
import Landing from "./components/Landing";
import Survey from "./components/survey/survey";
import Dashboard from "./components/admin/dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Real Time Feedback</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Dashboard</a>
                    </li>
                    </ul>
                </div>
                </nav>
      <Router>
      <Switch>
        <Route path="/admin" component={Dashboard} />
        <Route path="/guest/:id" component={GetForm} />
        <Route path="/guest" component={GetForm} />
        <Route path="/survey" component={Survey} />
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
