import { useNavigate } from "react-router-dom";
import { Chart } from "../chart";
import("./style.css");
const AdminDashbord = () => {
  const navigate = useNavigate();
  return (
    <div className="AdminDash">
      <h2 style={{fontFamily:"cursive"}}>📊 Dashboard</h2>
      <hr></hr>
      <Chart />
     
    </div>
  );
};

export default AdminDashbord;
