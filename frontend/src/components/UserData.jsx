import UserLogo from "./UserLogo";
import { useNavigate } from "react-router-dom";

const UserData = ({ id, name }) => {
  const navigate = useNavigate();

  const handleSendMoney = (e) => {
    e.preventDefault();
    console.log(name);
    navigate("/send", { state: { sendTo: id, userName: name } }); // send the id as state & retrieve using useLocation()
  };

  return (
    <div className='flex p-2 m-2 gap-2 items-center border-separate'>
      <UserLogo name={name} />
      <div>{name}</div>
      <button
        className='px-2 py-1 m-1 ml-auto rounded-md bg-indigo-300 font-medium hover:bg-indigo-600 hover:text-white'
        onClick={handleSendMoney}
      >
        Send money
      </button>
    </div>
  );
};

export default UserData;
