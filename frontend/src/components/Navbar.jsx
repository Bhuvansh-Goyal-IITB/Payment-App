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

export function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
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
        toast.error(error.response?.data.message ?? "Server Error!");
      });
  }

  return (
    <div className="flex flex-col grow gap-10 text-sm md:text-base">
      <div className="flex flex-col gap-2">
        <TabButton to="/">
          <div className="flex gap-2 justify-center items-center">
            <HomeIcon className="w-5 inline -translate-y-[2px]" />
            Home
          </div>
        </TabButton>
        <TabButton to="/transactions">
          <div className="flex gap-2 justify-center items-center">
            <CreditCardIcon className="w-5 inline" />
            Transactions
          </div>
        </TabButton>
      </div>
      <div className="flex flex-col gap-2">
        <SimpleButton onClick={() => navigate("/edit")}>
          <div className="flex gap-2 justify-center items-center">
            <UserCircleIcon className="w-5 inline" />
            Edit Profile
          </div>
        </SimpleButton>
        <SimpleButton onClick={handleLogout}>
          <div className="flex gap-2 justify-center items-center">
            <ArrowLeftStartOnRectangleIcon className="w-5 inline" />
            Logout
          </div>
        </SimpleButton>
      </div>
    </div>
  );
}

export default Navbar;
