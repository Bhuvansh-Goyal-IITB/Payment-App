import {
  HomeIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import SimpleButton from "./SimpleButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TabButton from "./TabButton";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  let [pending, setPending] = useState(false);

  function handleLogout() {
    setPending(true);
    axios
      .get("/api/v1/user/logout")
      .then(() => {
        toast.success("Logged out successfully!");
        localStorage.removeItem("loggedin");
        return navigate("/login");
      })
      .catch((error) => {
        if (error.response.status == 403) {
          toast.success("Logged out successfully!");
          localStorage.removeItem("loggedin");
          return navigate("/login");
        }
        setPending(false);
        toast.error(error.response?.data.message ?? "Server Error!");
      });
  }

  return (
    <div className="flex sm:flex-col grow justify-between gap-10 text-sm md:text-base">
      <div className="flex sm:flex-col gap-2">
        <TabButton to="/">
          <div className="flex gap-2 justify-center items-center">
            <HomeIcon className="w-4 sm:w-5 inline sm:-translate-y-[2px]" />
            <div className="hidden sm:block">Home</div>
          </div>
        </TabButton>
        <TabButton to="/transactions">
          <div className="flex gap-2 justify-center items-center">
            <CreditCardIcon className="w-4 sm:w-5 inline" />
            <div className="hidden sm:block">Transactions</div>
          </div>
        </TabButton>
      </div>
      <div className="flex sm:flex-col gap-2">
        <SimpleButton onClick={() => navigate("/edit")}>
          <div className="flex gap-2 justify-center items-center">
            <UserCircleIcon className="w-4 sm:w-5 inline" />
            <div className="hidden sm:block">Edit Profile</div>
          </div>
        </SimpleButton>
        <SimpleButton disabled={pending} onClick={handleLogout}>
          <div className="flex gap-2 justify-center items-center">
            <ArrowLeftStartOnRectangleIcon className="w-4 sm:w-5 inline" />
            <div className="hidden sm:block">Logout</div>
          </div>
        </SimpleButton>
        <div className="sm:hidden">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
