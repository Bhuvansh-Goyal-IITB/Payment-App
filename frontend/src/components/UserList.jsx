import { useEffect, useState } from "react";
import UserListLoading from "./UserListLoading";
import UserListItem from "./UserListItem";
import axios from "axios";

function UserList({ userEmail, deferredQuery, query }) {
  let [loading, setLoading] = useState(true);
  let [users, setUsers] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get(`/api/v1/user/bulk?filter=${query}`, { signal })
      .then(({ data: { users } }) => {
        setUsers(users);
      })
      .catch((_) => {});

    return () => {
      console.log("Abort");
      controller.abort();
    };
  }, [query]);

  if (loading) {
    return <UserListLoading />;
  }
  return (
    <div className="scroll-m-0 flex flex-col grow bg-white divide-y scrollbar-hide overflow-y-scroll">
      {users
        .filter(({ email }) => email != userEmail)
        .map(({ email, firstName, lastName, _id }) => (
          <UserListItem
            key={_id}
            stale={query != deferredQuery}
            firstName={firstName}
            lastName={lastName}
            email={email}
          />
        ))}
    </div>
  );
}

export default UserList;
