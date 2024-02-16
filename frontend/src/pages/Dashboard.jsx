import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import axios from "axios";
import UserCard from "../components/UserCard";
import { useDebounceValue } from "../hooks/useDebounceValue";
import LogoCard from "../components/LogoCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";

function Dashboard() {
  let [query, setQuery] = useState("");
  let [userProfile, setUserProfile] = useState({});
  let debounceQuery = useDebounceValue(query, 400);

  let [selectedTab, setSelectedTab] = useState("home");

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get("/api/v1/user/profile", { signal })
      .then(({ data: { user } }) => {
        setUserProfile(user);
      })
      .catch((error) => {
        if (error.code == "ERR_CANCELED") {
          return;
        }
        if (error.response.status == 403) {
          toast("Session timed out!", {
            icon: "🍪",
          });
          localStorage.removeItem("loggedin");
          return navigate("/login");
        }
        toast.error(error.response?.data.message ?? "Server Error!");
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="flex h-full">
      <div className="flex basis-1/5 flex-col items-center gap-2 p-2 item-bg">
        <LogoCard />
        <div className="flex justify-center w-2/3">
          <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
      </div>
      <div className="flex grow flex-col gap-4 p-4 bg">
        <UserCard {...userProfile} />
        <div className="flex flex-col gap-1">
          {selectedTab != "profile" && (
            <SearchBar
              placeholder="Search users"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          {selectedTab == "home" && (
            <UserList query={debounceQuery} debouncedQuery={query} />
          )}
          {selectedTab == "transactions" && (
            <TransactionList query={query} debouncedQuery={debounceQuery} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
