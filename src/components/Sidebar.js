import {Link} from "react-router-dom"

export default function Sidebar(){
    return(
        <div>
        <ul className="" >
                    <li className="list-group-item py-2"><Link to="/" className="nav-link">Home</Link></li>
                    <li className="list-group-item py-2"><Link to="/leads" className="nav-link">Leads</Link></li>
                    <li className="list-group-item py-2"><Link to="/sales" className="nav-link">Sales</Link></li>
                    <li className="list-group-item py-2"><Link to="/agents" className="nav-link">Agents</Link></li>
                    <li className="list-group-item py-2"><Link to="/report" className="nav-link">Reports</Link></li>
                    <li className="list-group-item py-2"><Link className="nav-link" to="leadStatusView">Leads Status</Link></li>
     </ul>
     </div>
    )
}