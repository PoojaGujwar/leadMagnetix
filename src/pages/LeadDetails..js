import { useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddLead from "../components/AddLead";
import { useEffect, useState } from "react";
import { leadCommentAsync, addComment } from "../features/leads/leadSlice";
import Header from "../components/Header";

export default function LeadDetails({onClose}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showValue, setShowValue] = useState(false);
  const [commentText, setComment] = useState("");
  const [message, setMessage] = useState("");
  const { id } = location.state;
  const { leads, status, error } = useSelector((state) => state);
  const leadComments = useSelector((state) => state.leads.leadComments);
  

  useEffect(() => {
    dispatch(leadCommentAsync(id));
  }, [id ,leads]);

  const filterdLead = leads.leads?.find((val) => val._id === id);
  console.log(filterdLead)

  const handleSubmitBtn = () => {
    if (commentText) {
      dispatch(addComment({ id,author:filterdLead?.salesAgent._id, commentText }));
      setMessage("Comment is added")
      dispatch(leadCommentAsync(id))
      setComment('')
      setTimeout(()=>{
        setMessage('')
      },2000)
    } else {
      setMessage("Please Enter comment");
    }
  };
  

 
  return (
    <>
    <div className="row"> 
      <div className="col-md-3 col-lg-3 px-5 py-2" style={{backgroundColor:"#bbdefb"}}>
        <NavLink to="/">Back to Dashboard</NavLink>
      </div>
      <div className="col-md-8">
        <h1 className="text-center py-3">Lead Details: {filterdLead.name}</h1>
        {status ==="Loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="card" style={{backgroundColor:"#e3f2fd"}}>
          <div className="card-body">
            <p>Lead Name: {filterdLead.name}</p>
            <p>Lead Source: {filterdLead.source}</p>
            <p>Lead Status: {filterdLead.status}</p>
            <p>Priority: {filterdLead.priority}</p>
            <p>Time to Close: {filterdLead.timeToClose}</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowValue(true)}
              state={{ id: filterdLead._id }}
            >
              Edit Lead
            </button>
            
            <h3 className="py-3">Comment{leadComments.length>1?"s":''}</h3>
            {message && <p>{message}</p>}
            <ul className="list-group">
            {leadComments.length > 0 &&
              leadComments.map((lead,index) => (
                <li key={index} className="list-group-item">
                  Author: {lead.author.name}<br/>
                  Comments: {lead.commentText}
                </li>
              ))}
              </ul>
              <div>
              <input
            type="text"
            placeholder="Add Comment"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            value={commentText}
            className ="form-control my-2"
          />
          <button className="btn btn-primary" onClick={handleSubmitBtn}>
            Add Comment
          </button>
              </div>
          </div>
          
        </div>
        {showValue && <AddLead  onClose={()=>setShowValue(false)}/>}
      </div>
    </div>
    </>
  );
}
