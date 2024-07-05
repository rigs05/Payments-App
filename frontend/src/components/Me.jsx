import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Me = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/me", {
          withCredentials: true,
        });
        if (res.status === 200) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.warn("No logged-in user found. Please sign in again.", err);
        // If no logged-in user, allow access to root ('/') which may redirect to /signin
        navigate("/signin");
      }
    };

    verifyUser();
  }, [navigate]);

  // Legacy Code:
  // const Me = () => {
  //   const navigate = useNavigate();
  //   try {
  //     axios
  //       .get("http://localhost:3000/api/v1/user/me", {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         if (res.status === 200) {
  //           navigate("/dashboard");
  //         }
  //       })
  //       .catch((err) => {
  //         console.warn("No logged in user found. Please sign in again. ", err);
  //         navigate("/signin");
  //       });
  //   } catch (error) {
  //     console.error("Error verifying user: ", error);
  //   }

  return null;
};

export default Me;
