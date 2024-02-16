import { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import axios from "axios";

function TransactionList({ query, debouncedQuery }) {
  let [transactions, setTransactions] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    axios
      .get(`/api/v1/account/bulk/transaction?filter=${query}`, { signal })
      .then(({ data: { transactions } }) => {
        setTransactions(transactions);
        setLoading(false);
      })
      .catch((_) => {});

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="scroll-m-0 rounded-md shadow-md divide-neutral-200 dark:divide-neutral-700 divide-y flex flex-col scrollbar-hide overflow-y-scroll">
      {transactions.map(({ amount, timestamp, user, received, _id }) => (
        <TransactionItem
          key={_id}
          stale={query != debouncedQuery ? true : loading}
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
