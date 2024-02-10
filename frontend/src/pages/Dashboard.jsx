import { useDeferredValue, useEffect, useState } from "react";
import Balance from "../components/Balance";
import SearchBar from "../components/SearchBar";
import Topbar from "../components/Topbar";
import UserList from "../components/UserList";

function useDebounceValue(input, debounceTime) {
  let [debounceValue, setDebounceValue] = useState(input);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebounceValue(input);
    }, debounceTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, debounceTime]);

  return debounceValue;
}

function Dashboard() {
  let [query, setQuery] = useState("");
  let debounceQuery = useDebounceValue(query, 400);

  let deferredQuery = useDeferredValue(debounceQuery);

  return (
    <div className="h-full">
      <Topbar />
      <div className="flex flex-col gap-2 h-full p-2 bg-gradient-light">
        <Balance balance={20.49} />
        <SearchBar
          placeholder="Search users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <UserList query={debounceQuery} deferredQuery={deferredQuery} />
      </div>
    </div>
  );
}
export default Dashboard;
