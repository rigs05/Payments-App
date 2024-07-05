import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LinkPage from "./components/LinkPage";
const Me = lazy(() => import("./components/Me"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SendMoney = lazy(() => import("./pages/SendMoney"));

function App() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Suspense fallback={"loading..."}>
                <Me />
              </Suspense>
            }
          />
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
                {/* Issue: write a function that redirects to dashboard if cookie is found else to signin */}
                <Signin />
              </Suspense>
            }
          />
          <Route
            path='/dashboard'
            element={
              <Suspense fallback='Loading...'>
                {/* Issue: write a function that redirects to signin if cookie NOT found */}
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path='/send'
            element={
              <Suspense fallback='Loading...'>
                <SendMoney />
              </Suspense>
            }
          />
          {/* Route for redirecting the URL and storing clicked-url data in cookie */}
          {/* <Route path='/link/:id' element={<LinkPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
