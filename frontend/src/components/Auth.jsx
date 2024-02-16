import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth({ children }) {
  let [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("loggedin")) {
      navigate("/login");
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) return <div className="w-full h-full bg"></div>;

  return <>{children}</>;
}

export default Auth;
