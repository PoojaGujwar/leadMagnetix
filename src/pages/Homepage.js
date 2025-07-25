import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchLead, filterdLead } from "../features/leads/leadSlice";
import { useEffect, useState } from "react";
import AddLead from "../components/AddLead";
import LeadDetails from "./LeadDetails.";
import Sidebar from "../components/Sidebar";
import Headers from "../components/Header";

export default function Homepage() {
  const dispatch = useDispatch();
  const [showValue, setShowValue] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { leads, status, error } = useSelector((state) => state.leads);
  const filteredLeads = useSelector((state) => state.leads.filteredLeads);
  const [allLead, setAllLead] = useState([]);

  useEffect(() => {
    dispatch(fetchLead());
  }, [showValue]);

  useEffect(() => {
    if(selectedStatus === "All"){
      setAllLead(leads)
    }else{
      setAllLead(filteredLeads);
    }
  }, [filteredLeads, leads, selectedStatus]);

  const handleRadioButton =(value)=>{
    setSelectedStatus(value)
    if(value === "All"){
      setAllLead(leads);
    }else{
      dispatch(filterdLead(value))
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center">
        <div className="row">
          <div
            className="col-md-3 col-lg-3 px-5 py-2"
            style={{ backgroundColor: "#bbdefb", 
              height: "100vh",
              top: 0,
              overflowY: "auto", }}
          >
            <Sidebar />
          </div>
          <div className="col-md-8 py-2">
            {status === "loading" && <p>Loading</p>}
            <div className="row">
              <div>
                <button
                  onClick={() => setShowValue(true)}
                  className="btn text-white mt-2"
                  style={{ backgroundColor: "#2196f3", border: "none" }}
                >
                  {" "}
                  Add Lead
                </button>
              </div>
              <div className="py-3">
                <input
                  type="radio"
                  name="status"
                  value="All"
                  checked={selectedStatus === "All"}
                  onChange={(e) => handleRadioButton(e.target.value)}
                    
                />{" "}
                All
                <br />
                <input
                  type="radio"
                  name="status"
                  checked={selectedStatus === "New"}
                  onChange={(e) =>handleRadioButton(e.target.value) }
                  value="New"
                />{" "}
                New
                <br />
                <input
                  type="radio"
                  name="status"
                  onChange={(e) =>handleRadioButton(e.target.value)}
                  checked={selectedStatus === "Contacted"}
                value="Contacted"
                />{" "}
                Contacted
                <br />
              </div>
              {status === "Loading" && <p className="py-3">Loading...</p>}
              {error && <p>{error}</p>}
              {allLead.length > 0 &&
                allLead.map((lead) => (
                  <div className="col-md-4">
                    <NavLink
                      to="/leadDetails"
                      state={{ id: lead._id }}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="card mb-3"
                        style={{ backgroundColor: "#bbdefb", border: "none" }}
                      >
                        <div className="card-body">
                          <p className="">Name: {lead.name}</p>
                          <p>Source: {lead.source}</p>
                          <p>Status: {lead.status}</p>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {showValue && <AddLead onClose={() => setShowValue(false)} />}
      </div>
    </>
  );
}
