import { useState } from "react";
import { useDispatch } from "react-redux";
import { newSalesAgentAsync } from "../features/leads/leadSlice";
import "./addForm.css"
import { X } from "lucide-react";

export default function AddAgent({onClose}) {
  const dispatch = useDispatch();

  const initialData = {
    name: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((preValue) => ({ ...preValue, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData){
    dispatch(newSalesAgentAsync(formData));
    onClose()
    }
  };
  return (
    <div className="popup-from">
      <form onSubmit={handleSubmit}>
        <button type="button" className="close-icon" onClick={onClose}><X/></button>
      <h1>Agent Form</h1>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          className="form-control"
          placeholder="Enter your name"
          required
        /><br/>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="form-control"
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="btn btn-primary my-2">
          +Add
        </button>
        <button type="button" className="btn btn-secondary mx-2"onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
