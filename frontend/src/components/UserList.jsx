import { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import axios from "axios";

function UserList({ debouncedQuery, query }) {
  let [loading, setLoading] = useState(true);
  let [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    axios
      .get(`/api/v1/user/bulk?filter=${query}`, { signal })
      .then(({ data: { users } }) => {
        setUsers(users);
        setLoading(false);
      })
      .catch((_) => {});

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="scroll-m-0 rounded-md shadow-md divide-neutral-200 dark:divide-neutral-700 divide-y flex flex-col scrollbar-hide overflow-y-scroll">
      {users.map(({ email, firstName, lastName, _id }) => (
        <UserListItem
          key={_id}
          stale={query != debouncedQuery ? true : loading}
          firstName={firstName}
          lastName={lastName}
          email={email}
        />
      ))}
    </div>
  );
}

export default UserList;
