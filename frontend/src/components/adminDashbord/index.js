import { useNavigate } from "react-router-dom";
import { Chart } from "../chart";

const AdminDashbord = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Chart />
     
    </div>
  );
};

export default AdminDashbord;
