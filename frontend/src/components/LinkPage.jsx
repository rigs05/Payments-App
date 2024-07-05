import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

// Render.StrictMode was rendering new tab twice and refresh making dashboard url to go back to signin

function LinkPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get("userId");
    const storedUrl = Cookies.get(`link_${user}_${id}`);
    console.log("STORED URL IS: ", storedUrl);
    // Still unable to keep on same page while reloading in background
    if (storedUrl) {
      const newTab = window.open(storedUrl, "_blank");
      if (newTab) {
        newTab.blur();
        window.focus();
      }
      navigate("/dashboard");
    }
  }, [id, navigate]);

  return null;
}
export default LinkPage;
