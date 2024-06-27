import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Dashboard from "../components/Dashboard";
import SendMoney from "../components/SendMoney";

function App() {
  return (
    <>
      <p className='text-green-700'>HELLO</p>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sendMoney' element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
