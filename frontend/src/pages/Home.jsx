import { useState } from "react";
import { useDebounceValue } from "../hooks/useDebounceValue";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";

function Home() {
  let [query, setQuery] = useState("");
  let debounceQuery = useDebounceValue(query, 400);

  return (
    <div className="flex overflow-clip flex-col gap-1">
      <SearchBar
        placeholder="Search users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="overflow-y-scroll rounded-md shadow-md scrollbar-hide">
        <UserList query={query} debouncedQuery={debounceQuery} />
      </div>
    </div>
  );
}

export default Home;
