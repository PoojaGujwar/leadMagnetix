import { useDispatch, useSelector } from "react-redux";
import { salesAgentsAsync } from "../features/leads/leadSlice";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddAgent from "../components/AddAgent";

export default function Agents() {
  const dispatch = useDispatch();
  const agents = useSelector((state) => state.leads.agents);
  const [showValue, setShowValue] = useState(false);

  useEffect(() => {
    dispatch(salesAgentsAsync());
  }, [agents]);
  return (
    <>
      
      <div className="row">
        <div
        className="col-md-3 col-lg-3 px-5 py-3" style={{backgroundColor:"#ffead9"}}
        >
          <NavLink to="/">Back to Dashboard</NavLink>
        </div>
        <div className="col-md-8 py-3">
        <h1 className="text-center">Sales Agents Management</h1>
        
          <div className="row mt-4">
            {agents?.length > 0 &&
              agents.map((agent) => (
                <div className="col-md-4">
                  <div
                    className="card mb-3"
                    style={{ backgroundColor: "#ffead9" }}
                  >
                    <div className="card-body">
                      <p>Name: {agent.name}</p>
                      <p>Email: {agent.email}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <NavLink
            className="btn btn-primary"
            onClick={() => setShowValue(true)}
          >
            +Add New Agent
          </NavLink>
          {showValue && <AddAgent onClose={()=>setShowValue(false)}/>}
        </div>
      </div>
    </>
  );
}
