import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import Cookies from "js-cookie";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = Cookies.get("user");
  const [balance, setBalance] = useState(null);
  // const [query, setQuery] = useState("");
  // const [userList, setUserList] = useState("");

  const randomLinks = [
    { id: 1, url: "https://google.com" },
    { id: 2, url: "https://fb.com" },
    { id: 3, url: "https://instagram.com" },
    { id: 4, url: "https://in.tradingview.com/chart" },
    { id: 5, url: "https://fastdl.app" },
    { id: 6, url: "https://geeksforgeeks.org" },
    { id: 7, url: "https://icpc.org" },
  ];

  // Get Account balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const getBalance = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          { withCredentials: true }
        );
        setBalance(getBalance.data.balance);
      } catch (error) {
        console.error("Unable to fetch balance.", error);
      }
    };
    fetchBalance();
  }, []);

  // Saving clicked Url data in a cookie for future references
  const handleURLClick = (id, url) => {
    const user = Cookies.get("userId");
    Cookies.set(`link_${user}_${id}`, url, { expires: 7 });
    // From here, we can send the cookie back to Backend
    navigate(`/link/${id}`);
  };

  // Get User data
  // function handleUserSearch() {
  // useEffect(() => {
  //   const userList = async () => {
  //     try {
  //       const result = await axios.get("");
  //       setUserList(result.data);
  //     } catch (err) {
  //       console.error("Error fetching Users.", err);
  //     }
  //   };
  // }, []);
  // }

  return (
    <div className='p-6 m-6 w-4/5 border shadow-md rounded-md bg-gray-100'>
      <div className='topBar py-2'>
        <div className='flex'>
          <div className='font-bold text-indigo-500'>PAYMENTS APPLICATION</div>
          <div className='ml-auto font-semibold'>Hello {userName}</div>
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
          // onInput={handleUserSearch}
        />
        {/* Display URLs */}
        <ul>
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
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
