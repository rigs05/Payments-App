import { useState } from "react";
import UserLogo from "../components/UserLogo";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userName: name, sendTo: to } = location.state || {};

  const handleAmount = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios
        .post(
          "http://localhost:3000/api/v1/account/transfer",
          {
            amount: Number(amount),
            to,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setMessage(
            `${response.data.message} Redirecting back to Dashboard...`
          );
          console.log("Success", response.data);
          setTimeout(() => {
            navigate("/dashboard");
          }, 5000);
        })
        .catch((err) => {
          setMessage(err.data.message);
        });
    } catch (err) {
      console.error("Failed to transfer money." + err);
      setError("Failed to send money. Please try again.");
    }
  };

  return (
    <div className='flex flex-col h-fit w-fit p-10 justify-center items-center shadow-md rounded-md'>
      <div className='flex flex-col mb-auto items-center'>
        <UserLogo name={name} />
        <span className='pt-2 pb-5 font-bold'>{name.toUpperCase()}</span>
      </div>
      <input
        className='border border-gray-500 width-fit p-2 rounded-sm placeholder:text-sm placeholder:text-center text-center text-lg font-semibold'
        outline='none'
        type='number'
        inputMode='numeric'
        placeholder='Enter Amount'
        onChange={(e) => {
          setError(null);
          setAmount(e.target.value);
        }}
      />
      <button
        className='px-3 py-2 mt-5 rounded-md bg-green-500 font-medium hover:bg-green-600 border border-green-600 hover:text-white'
        onClick={handleAmount}
      >
        Send money
      </button>
      <div className='text-red-600 m-4'>
        <p>{error}</p>
      </div>
      <div className='p-2 m-1 text-green-700 font-semibold text-md'>
        {message}
      </div>
    </div>
  );
};

export default SendMoney;
