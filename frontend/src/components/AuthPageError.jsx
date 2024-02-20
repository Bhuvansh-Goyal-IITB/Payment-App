import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAsyncError, useNavigate } from "react-router-dom";

function AuthPageError() {
  const error = useAsyncError();
  const navigate = useNavigate();

  useEffect(() => {
    if (error.response?.status == 403) {
      toast("Session Timed Out");
      localStorage.removeItem("loggedin");
      navigate("/login");
    }
  }, []);

  if (error.response?.status != 403) throw error;
}

export default AuthPageError;
