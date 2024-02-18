import { useState } from "react";
import { useDebounceValue } from "../hooks/useDebounceValue";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export async function loader() {
  const {
    data: { users },
  } = await axios.get("/api/v1/user/bulk");

  return { users };
}

function Home() {
  let [query, setQuery] = useState(null);
  const { users } = useLoaderData();
  let debounceQuery = useDebounceValue(query, 400);

  return (
    <div className="flex grow overflow-clip flex-col gap-1">
      <SearchBar
        placeholder="Search users"
        value={query ?? ""}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grow-0 overflow-y-scroll rounded-md shadow-md scrollbar-hide">
        <UserList
          defaultUsers={users}
          query={query}
          debouncedQuery={debounceQuery}
        />
      </div>
    </div>
  );
}

export default Home;
