import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import Cookies from "js-cookie";
import axios from "axios";
import UserData from "../components/UserData";
import UserLogo from "../components/UserLogo";

const Dashboard = () => {
  const userName = Cookies.get("user");
  const [balance, setBalance] = useState(null);
  const [userList, setUserList] = useState([]);
  const [query, setQuery] = useState("");

  /* // Dummy URL data for client-side cookie
    const navigate = useNavigate();
    const randomLinks = [
    { id: 1, url: "https://google.com" },
    { id: 2, url: "https://fb.com" },
    { id: 3, url: "https://instagram.com" },
    { id: 4, url: "https://in.tradingview.com/chart" },
    { id: 5, url: "https://fastdl.app" },
    { id: 6, url: "https://geeksforgeeks.org" },
    { id: 7, url: "https://icpc.org" },
  ]; */

  // GET Account balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const getBalance = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          { withCredentials: true } // Ensures cookie is passed with every request
        );
        setBalance(getBalance.data.balance);
      } catch (error) {
        console.error("Unable to fetch balance.", error);
      }
    };
    fetchBalance();
  }, []);

  // GET User data OR Search query if any
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/user/bulk",
          {
            withCredentials: true,
          }
        );
        // console.log(result.data.userList);
        setUserList(result.data.userList);
      } catch (err) {
        console.error("Error fetching Users.", err);
      }
    };
    fetchUsers();
  }, []);

  // Handle User Search Queries
  useEffect(() => {
    const searchUser = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/api/v1/user/bulk?filter=${query}`,
          {
            withCredentials: true,
          }
        );
        setUserList(result.data.userList);
      } catch (err) {
        console.error("Invalid search query."); // will also return Status 411 on console
        setUserList([]);
      }
    };
    searchUser();
  }, [query]);

  // Saving clicked Url data in a Cookie for future references
  /* const handleURLClick = (id, url) => {
    const user = Cookies.get("userId");
    Cookies.set(`link_${user}_${id}`, url, { expires: 7 });
    // From here, we can send the data-laden cookie back to Backend using Axios
    navigate(`/link/${id}`); // To route the redirection from the React-Router & not directly
  }; */

  // Issue: Can be refactored
  return (
    <div className='p-6 m-6 w-4/5 border shadow-md rounded-md bg-gray-100'>
      <div className='topBar py-2'>
        <div className='flex'>
          <div className='font-bold text-indigo-500'>PAYMENTS APPLICATION</div>
          <div className='flex justify-center items-center p-2 gap-2 ml-auto font-semibold'>
            <span>Hello {userName}</span>
            <UserLogo name={userName} />
          </div>
        </div>
        <div className='py-2 w-fit ml-auto'>
          <Logout />
        </div>
      </div>

      <div className='main_body m-3 px-3 border shadow-md'>
        <p className='my-4'>Your Balance: ₹{balance}</p>
        <div className='font-semibold'>USERS</div>
        <input
          type='search'
          placeholder='Search users...'
          className='my-4 p-2 w-1/3 border border-black rounded-md'
          onInput={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
        />

        <div>
          {userList.map((user) => {
            return <UserData key={user._id} id={user._id} name={user.name} />;
          })}
        </div>

        {/* Display URLs: Using cookie to store client-side data; highlighting URLs here */}
        {/* <ul>
          {randomLinks.map((link) => {
            const user = Cookies.get("userId");
            const visited = Cookies.get(`link_${user}_${link.id}`);
            return (
              <li key={link.id}>
                <a
                  href={link.url}
                  onClick={(e) => {
                    e.preventDefault();
                    handleURLClick(link.id, link.url);
                  }}
                  style={{ color: visited ? "purple" : "black" }}
                >
                  {link.url}
                </a>
              </li>
            );
          })}
        </ul> */}
      </div>
    </div>
  );
};

export default Dashboard;
