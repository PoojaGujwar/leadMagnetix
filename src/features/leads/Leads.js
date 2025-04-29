import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { fetchLead, filterdLead, salesAgentsAsync } from "./leadSlice"
import {NavLink} from "react-router-dom"

export default function Leads() {
  const dispatch = useDispatch()
  const {leads,status,error,agents} = useSelector((state)=>state.leads)
  const [leadData,setLeadData] = useState(leads||'')
  console.log(agents)

useEffect(()=>{
dispatch(fetchLead())
dispatch(salesAgentsAsync())
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
    const handleFilter =(e)=>{
      const {value} = e.target
      console.log(value)
      if(value ==='all'){
          setLeadData(leads)
      }else{
          const filterByAgent = leads?.filter((lead)=>lead.salesAgent.name === value)
          setLeadData(filterByAgent)
      }
    }
  return (
    <div>
<div className="row">
  <div className="col-md-3 col-lg-3 px-5 py-2" style={{backgroundColor:"#ffead9"}}>
    <NavLink to="/">Back to Dashboard</NavLink>
  </div>
  <div className="col-md-8 py-3">
  <h1 className="text-center">Lead  Management</h1>
          <div className="row mt-4">
            <div className="col-md-4">
            <h6>Filter by Status</h6>
            <select onChange={handleStatusFilter} className="form-control my-3">
            <option value={"All"}>All</option>
            <option value={"New"}>New</option>
            <option value={"Contacted"}>Contacted</option>
            <option value={"Closed"}>Closed</option>
            <option value={"Qualified"}>Qualified</option>
            <option value={"Proposal Sent"}>Proposal Sent</option>
          </select>
            </div>
            <div className="col-md-4">
            <h6>Filter by Agents</h6>
            <select onChange={handleFilter} className="form-control my-3">
                <option value="all">All</option>
                {agents?.map((agent)=><option value={agent.name}>{agent.name}</option>)}
            </select>
            </div>
          </div>
          
    <div className="row">
    {status === "Loading"&& <p>Loading...</p>} 
      {leadData?.map((lead,index)=>(
        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-header" style={{backgroundColor:"#ffead9"}}>
              <p>{lead.name}</p>
            </div>
            <div className="card-body">
              <p>Status: {lead.status}</p>
              <p>Sales Agent: {lead.salesAgent.name}</p>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  </div>
</div>
    </div>
  )
}
