import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeadAsync,
  editLeadAsync,
  salesAgentsAsync,
} from "../features/leads/leadSlice";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { X } from "lucide-react";
import "./addForm.css";

export default function AddLead({ onClose}) {
  const dispatch = useDispatch();
  const { agents } = useSelector((state) => state.leads);
  const [message,setMessage] = useState('')
  const location = useLocation();
  const id = location?.state?.id;

  const { leads } = useSelector((state) => state.leads);
  const initialData = {
    name: "",
    salesAgent: "",
    source: "",
    status: "",
    tags: "",
    timeToClose: "",
    priority: "",
    createAt: "",
    updateAt: "",
    closedAt: "",
  };
  const [formData, setFormData] = useState(initialData);
  useEffect(() => {
    dispatch(salesAgentsAsync());
  }, []);
  const handleForm = (e) => {
    e.preventDefault();
    try{
        if (id) {
            dispatch(editLeadAsync({ id, updatedData: formData }));
            setFormData(formData);
            setMessage("Edit Lead Successfully")
            console.log(formData)
          } else {
            dispatch(addLeadAsync(formData));
            setFormData(initialData)
            setMessage("Lead is Added Successfully")
           console.log(formData)
           
          }
    }catch(error){
        throw new Error("")
    }
    finally{
        setTimeout(()=>{
            setMessage('')
            onClose()
         },2000)
    }
    };
  useEffect(() => {
    if (id) {
      const filteredLead = leads?.find((val) => val._id === id);
      if (filteredLead) {
        const formatDate = (dateStr) => {
          if (!dateStr) return "";
          return new Date(dateStr).toISOString().split("T")[0]; // YYYY-MM-DD
        };
        setFormData({
          name: filteredLead.name,
          salesAgent: filteredLead.salesAgent,
          source: filteredLead.source,
          status: filteredLead.status,
          tags: filteredLead.tags,
          timeToClose: filteredLead.timeToClose,
          priority: filteredLead.priority,
          createAt: formatDate(filteredLead.createAt),
          updateAt: formatDate(filteredLead.updateAt),
          closedAt: formatDate(filteredLead.closedAt),
        });
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="popup-from">
      <div>
        <form
          onSubmit={handleForm}
          style={{ backgroundColor: "#ffead9", padding: "20px" }}
        >
          <button type="button" onClick={onClose} className="close-icon">
            <X />
          </button>
          <h3>Lead Form </h3>
          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="form-control"
              required
            />
          </div>
          <div>
            <label>Sales Agent</label>
            <select
              className="form-control"
              name="salesAgent"
              onChange={handleChange}
              value={formData.salesAgent}
            >
              {agents?.map((agent) => (
                <option value={agent._id}>{agent.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Source:</label>
            <select
              name="source"
              onChange={handleChange}
              className="form-control"
              value={formData.source}
              required
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formData.status}
              className="form-control"
              required
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              onChange={handleChange}
              value={formData.tags}
              className="form-control"
            />
          </div>
          <div>
            <label>Time to Close: </label>
            <input
              type="number"
              name="timeToClose"
              onChange={handleChange}
              value={formData.timeToClose}
              className="form-control"
            />
          </div>
          <div>
            <label>Priority: </label>
            <br />
            <select
              name="priority"
              onChange={handleChange}
              value={formData.priority}
              className="form-control"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label>Create Date: </label>
            <input
              type="date"
              name="createAt"
              onChange={handleChange}
              value={formData.createAt}
              className="form-control"
            />
            <br />
            <label>Update Date: </label>
            <input
              type="date"
              name="updateAt"
              onChange={handleChange}
              value={formData.updateAt}
              className="form-control"
            />
            <br />
            <label>Closed Date: </label>
            <input
              type="date"
              name="closedAt"
              onChange={handleChange}
              value={formData.closedAt}
              className="form-control"
            />
            <br />
          </div>
          {message && <p className="alert alert-success">{message}</p>}
          <div>
            <button type="submit" className="btn btn-primary">
             {id?"Edit Lead":"Add Lead"} 
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
