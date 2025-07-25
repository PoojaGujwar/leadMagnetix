import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { reportAsync, salesAgentsAsync } from "../features/leads/leadSlice";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Reports() {
  const dispatch = useDispatch();

  const { totalLeadsInPipeline, leads, agents } = useSelector(
    (state) => state.leads
  );

  useEffect(() => {
    dispatch(reportAsync());
    dispatch(salesAgentsAsync());
  }, []);
  const data = {
    labels: ["Leads", "Closed"],
    datasets: [
      {
        label: "Total closed leads",
        data: [leads.length, totalLeadsInPipeline],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const labels = agents?.map((val) => val.name);
  const ansOf = leads?.reduce((acc, curr) => {
    const agentName = curr.salesAgent?.name;
    if (curr.status === "Closed" && agentName) {
      acc[agentName] = (acc[agentName] || 0) + 1;
    }
    return acc;
  }, {});
  const closedLeadsByAgent = agents?.map((agent) => ansOf[agent.name] || 0);

  const calculateStatus = leads?.reduce((acc, curr) => {
    const status = curr.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  const ans = Object.keys(calculateStatus);
  const ans1 = Object.values(calculateStatus);


  return (
    <div style={{minHeight: "100vh"}}>
      <div className="row">
        <div
          className="col-md-3 col-lg-3 px-5 py-2"
          style={{backgroundColor:"#bbdefb", minHeight: "100vh"}}
        >
          <NavLink to="/">Back to Dashboard</NavLink>
        </div>
        <div className="col-md-8 py-3">
          <h1 className="mb-3"> Reports Overview:  </h1>
          <div className="d-flex flex-column ">
            <div className="text-center mb-2" style={{ width: "400px", height: "500px", margin: "0 auto"  }}>
            <h4>Total Leads In Pipeline</h4>
            <Pie data={data} />
          </div>
          <div className="text-center mb-3" style={{ width: "500px", height: "400px", margin: "0 auto" }}>
          <h4>Sales Agent Status is Closed</h4>
          <Bar
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Closed Leads",
                  data: closedLeadsByAgent,
                  backgroundColor: "Pink",
                },
              ],
            }}
           
          />
          </div>
          <div className=" text-center mb-2" style={{ width: "400px", height: "500px", margin: "0 auto" }}>
          <h4>Lead Status</h4>
          <Pie
            data={{
              labels: ans,
              datasets: [
                {
                  label: `Total leads`,
                  data: ans1,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                  ].slice(0, ans.length),
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 205, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(201, 203, 207, 1)",
                  ].slice(0, ans.length),
                  borderWidth: 1,
                },
              ],
            }}
            
          />
          
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
