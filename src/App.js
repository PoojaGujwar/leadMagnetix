import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Homepage from './pages/Homepage';
import Leads from './features/leads/Leads';
import Sales from './pages/Sales';
import Agents from './pages/Agents';
import Reports from './pages/Reports';
import "bootstrap/dist/css/bootstrap.min.css"
import LeadDetails from './pages/LeadDetails.';
import { LeadStatusView } from './pages/LeadStatusView';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/leads' element={<Leads/>}/>
          <Route path='/sales' element={<Sales/>}/>
          <Route path='/agents' element={<Agents/>}/>
          <Route path='/report' element={<Reports/>}/>
          <Route path='/leadDetails' element={<LeadDetails/>}/>
          <Route path="/leadStatusView" element={<LeadStatusView/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
