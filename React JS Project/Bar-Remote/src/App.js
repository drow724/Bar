import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Remote from './routes/RemoteRoute';

import './App.css';

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
          <Routes >
            <Route path="/" element={<Remote />} />
          </Routes>
    </Router>
  );
}

export default App;
