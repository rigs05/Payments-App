import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SendMoney = lazy(() => import("./pages/SendMoney"));

function App() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100'>
      <BrowserRouter>
        {/* <Suspense fallback='load'> */}
        <Routes>
          {/* <Route path='/signup' element={<Signup />} /> */}
          <Route
            path='/signup'
            element={
              <Suspense fallback='Loading...'>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path='/signin'
            element={
              <Suspense fallback='Loading...'>
                <Signin />
              </Suspense>
            }
          />
          <Route
            path='/dashboard'
            element={
              <Suspense fallback='Loading...'>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path='/sendMoney'
            element={
              <Suspense fallback='Loading...'>
                <SendMoney />
              </Suspense>
            }
          />
          <Route path='/send' element={sendFunction()} />
        </Routes>
        {/* </Suspense> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

function sendFunction() {}
