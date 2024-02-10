import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import tokenAtom from "../atoms/token.js";
import { useEffect, useState } from "react";

function Auth({ children }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenAtom);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    setAuth(true);
  }, []);

  if (auth) return <>{children}</>;

  return <></>;
}

export default Auth;
