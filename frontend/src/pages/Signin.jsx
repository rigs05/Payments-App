import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // console.log("email: " + userId, "password: " + password);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          userId,
          password,
        }
        // { withCredentials: true } // Ensures sending the cookies along with request
      );
      if (response.status === 200) {
        console.log(response.data);
        navigate("/Dashboard");
      }

      // localStorage.setItem("token", res.data.token); // Now included in cookie
    } catch (err) {
      console.error("Cannot Login: " + err);
      if (err.response && err.response.status === 411) {
        setError("Invalid credentials, please try again.");
      } else {
        setError("Unable to login, please try later.");
      }
    }
  };

  // To reduce re-rendering and clearing of any errors
  const handleUserId = useCallback((e) => {
    setError("");
    setUserId(e.target.value);
  }, []);

  const handleUserPassword = useCallback((e) => {
    setError("");
    setPassword(e.target.value);
  }, []);

  return (
    <div className='p-6 px-12 bg-gray-100 rounded-xl shadow-md space-y-4'>
      <h1 className='text-xl font-semibold'>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label className='block text-gray-700'>User Id</label>
          <input
            type='email'
            // value={userId}
            placeholder='test@gmail.com'
            onChange={handleUserId}
            className='mt-1 mb-2 block w-full px-5 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <label className='block text-gray-700'>Password</label>
          <input
            type='password'
            // value={password}
            placeholder='********'
            onChange={handleUserPassword}
            className='mt-1 mb-2 block w-full px-5 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <p className='text-md text-red-800'>{error}</p>
        </div>
        <button
          type='submit'
          className='mt-5 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700'
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
