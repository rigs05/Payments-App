import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Sending details to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/api/v1/user/signup", {
          firstName,
          lastName,
          userId,
          password,
        })
        .then((res) => {
          console.log(res);
          navigate("/signin");
        });
    } catch (err) {
      console.error("Signup failed: " + err);
    }
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className='p-6 px-12 bg-gray-100 rounded-xl shadow-md space-y-4'>
      <h1 className='text-xl font-semibold'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='block text-gray-700'>First Name</label>
          <input
            type='text'
            // value={firstName}
            placeholder='John'
            onChange={(e) => setFirstName(e.target.value)}
            className='mt-1 mb-2 block w-full px-5 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <label className='block text-gray-700'>Last Name</label>
          <input
            type='text'
            // value={lastName}
            placeholder='Snow'
            onChange={(e) => setLastName(e.target.value)}
            className='mt-1 mb-2 block w-full px-5 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <label className='block text-gray-700'>User Id</label>
          <input
            type='email'
            // value={userId}
            placeholder='johnsnow@gmail.com'
            onChange={(e) => setUserId(e.target.value)}
            className='mt-1 mb-2 block w-full px-5 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <label className='block text-gray-700'>Password</label>
          <input
            type='password'
            // value={password}
            placeholder='********'
            onChange={(e) => setPassword(e.target.value)}
            className='mt-1 mb-2 block w-full px-5 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <button
          type='submit'
          className='mt-5 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700'
        >
          Sign Up
        </button>
      </form>
      <div>
        <p className='text-sm'>
          Already have an Account?
          <span onClick={handleSignIn}>
            <a href=''>Sign in</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
