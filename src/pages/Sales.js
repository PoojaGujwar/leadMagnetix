import {NavLink} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { fetchLead, salesAgentsAsync } from "../features/leads/leadSlice"
import {useEffect, useState} from "react";

export default function Sales() {

  const {agents,leads} = useSelector((state)=>state.leads)
  const dispatch = useDispatch()
  const [leadData,setLeadData] = useState(leads||'')
  console.log(leads)
  useEffect(()=>{
    dispatch(salesAgentsAsync())
    dispatch(fetchLead())
  },[])

 const handleStatusFilter =(e)=>{
const {value} = e.target
if(value === "All"){
  setLeadData(leads)
}else{
  const filterByStatus = leads?.filter((lead)=>lead.status === value)

  console.log(filterByStatus.length)
  setLeadData(filterByStatus)
 }
}
  return (
    <div>
      <div className="row">
        <div className="col-md-3 col-lg-3 px-5 py-2" style={{backgroundColor:"#ffead9"}}><NavLink to="/">Back to Dashboard</NavLink></div>
        <div className="col-md-8 py-2">
          <h1 className="text-center"> Sales Agent View </h1>
          <h5 className="mt-4">Lead List by Agent</h5>
          <select onChange={handleStatusFilter} className="form-control">
            <option value={"All"}>All</option>
            <option value={"New"}>New</option>
            <option value={"Contacted"}>Contacted</option>
            <option value={"Closed"}>Closed</option>
            <option value={"Qualified"}>Qualified</option>
            <option value={"Proposal Sent"}>Proposal Sent</option>
          </select>
          {agents?.length > 0 ? (
            agents.map((agent) => {
              const agentLeads = leadData.filter(
                (lead) => lead.salesAgent.name === agent.name
              );
              return (
                <div key={agent.id}>
                  <h4>Agent Name: {agent.name}</h4>
                  {agentLeads.length > 0 ? (
                    <ul>
                      {agentLeads.map((val, index) => (
                        <li key={index}>
                          Lead - [Status: {val.status}]
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No leads assigned to this agent.</p>
                  )}
                </div>
              );
            })
          ) : (
            <p>No agents available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
