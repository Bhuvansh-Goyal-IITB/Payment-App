import { useState } from "react";
import { useDebounceValue } from "../hooks/useDebounceValue";
import SearchBar from "../components/SearchBar";
import TransactionList from "../components/TransactionList";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export async function loader() {
  const {
    data: { transactions },
  } = await axios.get("/api/v1/account/bulk/transaction");

  return { transactions };
}

function Transactions() {
  let [query, setQuery] = useState(null);
  const { transactions } = useLoaderData();
  let debounceQuery = useDebounceValue(query, 400);

  return (
    <div className="flex overflow-clip flex-col gap-1">
      <SearchBar
        placeholder="Search users"
        value={query ?? ""}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="overflow-y-scroll rounded-md shadow-md scrollbar-hide">
        <TransactionList
          defaultTransactions={transactions}
          query={query}
          debouncedQuery={debounceQuery}
        />
      </div>
    </div>
  );
}

export default Transactions;
