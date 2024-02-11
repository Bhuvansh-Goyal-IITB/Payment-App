import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Auth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("loggedin")) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
}

export default Auth;
