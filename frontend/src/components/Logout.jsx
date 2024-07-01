import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove("token");
    Cookies.remove("user");

    navigate("/signin");
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
