import { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import axios from "axios";
import ListItemLoader from "./ListItemLoader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function TransactionList({ query, debouncedQuery }) {
  let [transactions, setTransactions] = useState([]);
  let [initialLoad, setInitialLoad] = useState(true);
  let [queryLoad, setQueryLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setQueryLoad(true);

    axios
      .get(`/api/v1/account/bulk/transaction?filter=${query}`, { signal })
      .then(({ data: { transactions } }) => {
        setTransactions(transactions);
        setQueryLoad(false);
        setInitialLoad(false);
      })
      .catch((error) => {
        console.log("hi");
        if (error.response?.status == 403) {
          localStorage.removeItem("loggedin");
          toast("Session Timed Out!");
          navigate("/login");
        }
      });

    return () => {
      controller.abort();
    };
  }, [query]);

  if (initialLoad) {
    return (
      <div className="scroll-m-0 rounded-md shadow-md divide-neutral-200 dark:divide-neutral-700 divide-y flex flex-col scrollbar-hide overflow-y-scroll">
        {Array.from({ length: 10 }).map((_, index) => (
          <ListItemLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="scroll-m-0 rounded-md shadow-md divide-neutral-200 dark:divide-neutral-700 divide-y flex flex-col scrollbar-hide overflow-y-scroll">
      {transactions.map(({ amount, timestamp, user, received, _id }) => (
        <TransactionItem
          key={_id}
          stale={query != debouncedQuery ? true : queryLoad}
          user={user}
          received={received}
          amount={amount}
          timestamp={timestamp}
        />
      ))}
    </div>
  );
}

export default TransactionList;
