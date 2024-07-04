import UserLogo from "./UserLogo";
import { useNavigate } from "react-router-dom";

const UserData = ({ key, name }) => {
  const navigate = useNavigate();
  return (
    <div className='flex p-2 m-2 gap-2 items-center border-separate'>
      <UserLogo name={name} />
      <div>
        {key}
        {name}
      </div>
      <button
        className='px-2 py-1 m-1 ml-auto rounded-md bg-indigo-300 font-medium hover:bg-indigo-600 hover:text-white'
        onClick={(e) => {
          e.preventDefault();
          navigate("/send");
        }}
      >
        Send money
      </button>
    </div>
  );
};

export default UserData;
