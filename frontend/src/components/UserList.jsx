import { useEffect, useState } from "react";
import UserListLoading from "./UserListLoading";
import UserListItem from "./UserListItem";

function UserList({ deferredQuery, query }) {
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

    fetch(`http://localhost:3000/api/v1/user/bulk?filter=${query}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((_) => {});

    return () => {
      controller.abort();
    };
  }, [query]);

  if (loading) {
    return <UserListLoading />;
  }
  return (
    <div className="flex flex-col gap-1">
      {users.map(({ firstName, lastName, _id }) => (
        <UserListItem key={_id} firstName={firstName} lastName={lastName} />
      ))}
    </div>
  );
}

export default UserList;
