import {
  HomeIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import TabButton from "./TabButton";
import SimpleButton from "./SimpleButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Navbar({ selectedTab, setSelectedTab }) {
  const navigate = useNavigate();

  function handleTabSelect(callerTab) {
    return function () {
      if (selectedTab == callerTab) return;
      setSelectedTab(callerTab);
    };
  }

  function handleLogout() {
    axios
      .get("/api/v1/user/logout")
      .then(() => {
        toast.success("Logged out successfully!");
        localStorage.removeItem("loggedin");
        navigate("/login");
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
    <div className="flex flex-col grow gap-2">
      <TabButton
        selected={selectedTab == "home"}
        onClick={handleTabSelect("home")}
      >
        <div className="flex gap-2 justify-center items-center text-lg">
          <HomeIcon className="w-5 inline -translate-y-[2px]" />
          Home
        </div>
      </TabButton>
      <TabButton
        selected={selectedTab == "transactions"}
        onClick={handleTabSelect("transactions")}
      >
        <div className="flex gap-2 justify-center items-center text-lg">
          <CreditCardIcon className="w-5 inline" />
          Transactions
        </div>
      </TabButton>
      <TabButton
        selected={selectedTab == "profile"}
        onClick={handleTabSelect("profile")}
      >
        <div className="flex gap-2 justify-center items-center text-lg">
          <UserCircleIcon className="w-5 inline" />
          Profile
        </div>
      </TabButton>
      <SimpleButton onClick={handleLogout}>
        <div className="flex gap-2 justify-center items-center text-lg">
          <ArrowLeftStartOnRectangleIcon className="w-5 inline" />
          Logout
        </div>
      </SimpleButton>
    </div>
  );
}

export default Navbar;
