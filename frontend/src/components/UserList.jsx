import { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import axios from "axios";

function UserList({ defaultUsers, debouncedQuery, query }) {
  let [loading, setLoading] = useState(true);
  let [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    if (query == null) {
      setUsers(defaultUsers);
      setLoading(false);
    } else {
      axios
        .get(`/api/v1/user/bulk?filter=${query}`, { signal })
        .then(({ data: { users } }) => {
          setUsers(users);
          setLoading(false);
        })
        .catch((_) => {});
    }

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="divide-neutral-200 dark:divide-neutral-700 divide-y flex flex-col">
      {users.map(({ email, firstName, lastName, _id }) => (
        <UserListItem
          key={_id}
          id={_id}
          stale={
            query == null ? false : query != debouncedQuery ? true : loading
          }
          firstName={firstName}
          lastName={lastName}
          email={email}
        />
      ))}
    </div>
  );
}

export default UserList;
