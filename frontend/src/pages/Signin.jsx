import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputBox from "../components/InputBox";

const Signin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Login function call to BE
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear the error message prompt
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          userId,
          password,
        },
        { withCredentials: true } // Ensures sending & receiving the cookies along with request
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

  /* Refactor these handle functions in a way that reduces re-rendering of components
    after input userId & pass */
  // To clear any errors
  const handleUserId = useCallback((e) => {
    setError(""); // Will reset the error text (Invalid credentials) on the page
    setUserId(e.target.value);
  }, []);

  const handleUserPassword = useCallback((e) => {
    setError("");
    setPassword(e.target.value);
  }, []);

  // Redirect to Signup page
  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className='p-6 px-12 bg-gray-100 rounded-xl shadow-md space-y-4'>
      <h1 className='text-xl font-semibold'>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <InputBox
          label={"User Id"}
          type={"email"}
          placeholder={"john@gmail.com"}
          onChange={handleUserId}
          // Old Inline code:
          /* onChange={(e) => {
            setUserId(e.target.value);
          }} */
        />
        <InputBox
          label={"Password"}
          type={"password"}
          placeholder={"********"}
          onChange={handleUserPassword}
        />

        {/* Error message field */}
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
      <div>
        <p className='text-sm'>
          Don't have an Account?
          <span onClick={handleSignUp} className='font-semibold text-blue-600'>
            <a href=''> Signup </a>
          </span>
          here.
        </p>
      </div>
    </div>
  );
};

export default Signin;
