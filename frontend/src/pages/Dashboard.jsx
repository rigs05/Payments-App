import Logout from "../components/Logout";
import Cookies from "js-cookie";

const Dashboard = () => {
  const userName = Cookies.get("user");
  return (
    <div>
      <div>Hello {userName}</div>
      <Logout />
    </div>
  );
};

export default Dashboard;
