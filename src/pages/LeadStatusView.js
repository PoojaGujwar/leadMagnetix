import { useSelector, useDispatch } from "react-redux";
import { fetchLead, salesAgentsAsync } from "../features/leads/leadSlice";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const LeadStatusView = () => {
  const dispatch = useDispatch();

  const { leads } = useSelector((state) => state.leads);
  const [leadData, setLeadData] = useState(leads || "");
  const { agents } = useSelector((state) => state.leads);
  const statusIsNew = leadData?.filter((lead) => lead.status === "New");
  const statusIsClosed = leadData?.filter((lead) => lead.status === "Closed");
  const statusIsContacted = leadData?.filter(
    (lead) => lead.status === "Contacted"
  );
  const statusIsProposalSent = leadData?.filter(
    (lead) => lead.status === "Proposal Sent"
  );
  const statusIsQualified = leadData?.filter(
    (lead) => lead.status === "Qualified"
  );

  useEffect(() => {
    dispatch(fetchLead());
    dispatch(salesAgentsAsync());
  }, []);

  const handleFilter = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value === "all") {
      setLeadData(leads);
    } else {
      const filterByAgent = leads?.filter(
        (lead) => lead.salesAgent.name === value
      );
      setLeadData(filterByAgent);
    }
  };
  return (
    <div>
      <div className="row">
        <div
          className="col-md-3 col-lg-3 px-5 py-2"
          style={{ backgroundColor: "#bbdefb",height: "100vh" }}
        >
          <NavLink to="/">Back to Dashboard</NavLink>
        </div>
        <div className="col-md-8 py-2">
          <h1 className="text-center">Lead List by Status</h1>
          <select onChange={handleFilter} className="form-control my-3">
            <option value="all">All</option>
            {agents?.map((agent) => (
              <option value={agent.name}>{agent.name}</option>
            ))}
          </select>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card h-100 shadow">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#e3f2fd",border:"none" }}
                >
                  <h5>Status: new</h5>
                </div>
                <div className="card-body">
                  <ul>
                    {statusIsNew.length > 0
                      ? statusIsNew?.map((lead, index) => (
                          <li>
                            Lead {index + 1} - Sales Agent:{" "}
                            {lead.salesAgent.name} {lead.status}
                          </li>
                        ))
                      : `No leads found for the selected agents`}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100 shadow">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#e3f2fd",border:"none" }}
                >
                  <h5>Status: Closed</h5>
                </div>
                <div className="card-body">
                  <ul>
                    {statusIsClosed.length > 0
                      ? statusIsClosed?.map((lead, index) => (
                          <li>
                            Lead {index + 1} - Sales Agent:{" "}
                            {lead.salesAgent.name}{" "}
                          </li>
                        ))
                      : `No leads found for the selected agent`}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100 shadow">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#e3f2fd",border:"nonde" }}
                >
                  <h5>Status: Contacted</h5>
                </div>
                <div className="card-body">
                  <ul>
                    {statusIsContacted.length > 0
                      ? statusIsContacted?.map((lead, index) => (
                          <li>
                            Lead {index + 1} - Sales Agent:{" "}
                            {lead.salesAgent.name}{" "}
                          </li>
                        ))
                      : `No leads found for the selected agent`}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100 shadow">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#e3f2fd",border:"nonde" }}
                >
                  <h5>Status: Proposal Sent</h5>
                </div>
                <div className="card-body">
                  <ul>
                    {statusIsProposalSent.length > 0
                      ? statusIsProposalSent?.map((lead, index) => (
                          <li>
                            Lead {index + 1} - Sales Agent:{" "}
                            {lead.salesAgent.name}{" "}
                          </li>
                        ))
                      : `No leads found for the selected agent`}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100 shadow">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#e3f2fd",border:"nonde" }}
                >
                  <h5>Status: Qualified</h5>
                </div>
                <div className="card-body">
                  <ul>
                    {statusIsQualified.length > 0
                      ? statusIsQualified?.map((lead, index) => (
                          <li>
                            Lead {index + 1} - Sales Agent:{" "}
                            {lead.salesAgent.name}{" "}
                          </li>
                        ))
                      : `No leads found for the selected agent`}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
