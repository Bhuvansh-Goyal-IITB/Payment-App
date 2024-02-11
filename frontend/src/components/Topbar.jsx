import axios from "axios";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = memo(() => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-white justify-between items-center px-3 shadow-md">
      <div className="text-xl p-2 text-gradient-neutral-700 font-bold">
        PayTM
      </div>
      <div className="flex gap-1 items-center">
        <div
          onClick={() => {
            localStorage.removeItem("loggedin");
            axios.get("/api/v1/user/logout").then(() => {
              navigate("/login");
            });
          }}
          className="transition-colors hover:cursor-pointer hover:text-black text-stone-800 p-2 m-2 rounded-md"
        >
          Logout
        </div>
      </div>
    </div>
  );
});

export default Topbar;
