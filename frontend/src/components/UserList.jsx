import { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import axios from "axios";
import ListItemLoader from "./ListItemLoader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UserList({ debouncedQuery, query }) {
  let [initialLoad, setInitialLoad] = useState(true);
  let [queryLoad, setQueryLoad] = useState(true);
  let [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setQueryLoad(true);

    axios
      .get(`/api/v1/user/bulk?filter=${query}`, { signal })
      .then(({ data: { users } }) => {
        setUsers(users);
        setQueryLoad(false);
        setInitialLoad(false);
      })
      .catch((error) => {
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
    <div className="divide-neutral-200 dark:divide-neutral-700 divide-y flex flex-col">
      {users.map(({ email, firstName, lastName, _id }) => (
        <UserListItem
          key={_id}
          id={_id}
          stale={query != debouncedQuery ? true : queryLoad}
          firstName={firstName}
          lastName={lastName}
          email={email}
        />
      ))}
    </div>
  );
}

export default UserList;
