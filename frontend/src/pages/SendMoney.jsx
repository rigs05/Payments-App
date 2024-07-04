import { useState } from "react";
import UserLogo from "../components/UserLogo";
import axios from "axios";

const SendMoney = ({ id, name }) => {
  const [amount, setAmount] = useState(0);

  const handleAmount = async (e) => {
    await axios
      .post(
        "localhost:3000/api/v1/account/transfer",
        {
          amount,
          to,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Success", response.data);
      });
  };

  return (
    <div className=''>
      <div className=''>
        <UserLogo name={name} />
      </div>
      <input
        className='border width-fit'
        outline='none'
        type='number'
        placeholder='Enter Amount'
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button onClick={handleAmount}>Send Money</button>
    </div>
  );
};

export default SendMoney;
