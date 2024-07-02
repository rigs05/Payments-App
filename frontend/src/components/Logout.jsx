import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    // e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/v1/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/signin");
      console.log("Logout Successful.");
    } catch (error) {
      console.error("Cannot Logout: ", error);
    }
  }
  return (
    <div>
      <button
        onClick={handleLogout}
        className='px-2 py-1 border border-black rounded-md shadow bg-transparent hover:bg-red-600 hover:border-red-800 hover:text-white active:text-red-700'
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
