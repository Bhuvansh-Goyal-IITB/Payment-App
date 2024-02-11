import { useDeferredValue, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import UserList from "../components/UserList";
import axios from "axios";
import UserCard from "../components/UserCard";
import { useDebounceValue } from "../hooks/useDebounceValue";

function Dashboard() {
  let [query, setQuery] = useState("");
  let [balance, setBalance] = useState("");
  let [userProfile, setUserProfile] = useState({});
  let debounceQuery = useDebounceValue(query, 400);
  let deferredQuery = useDeferredValue(debounceQuery);

  useEffect(() => {
    axios.get("/api/v1/account/balance").then(({ data: { balance } }) => {
      setBalance(balance.toFixed(2).toString());
    });

    axios.get("/api/v1/user/profile").then(({ data: { user } }) => {
      setUserProfile(user);
    });
  }, []);

  return (
    <div className="h-full">
      <Topbar />
      <div className="flex flex-col gap-2 h-full p-2 bg-gradient-light">
        <UserCard balance={balance} {...userProfile} />
        <SearchBar
          placeholder="Search users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <UserList
          userEmail={userProfile.email}
          query={debounceQuery}
          deferredQuery={deferredQuery}
        />
      </div>
    </div>
  );
}
export default Dashboard;
