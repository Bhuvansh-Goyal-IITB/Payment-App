import axios from "axios";
import UserCard from "../components/UserCard";
import LogoCard from "../components/LogoCard";
import { Outlet, defer, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import AsyncComponent from "../components/AsyncComponent";
import UserCardLoader from "../components/UserCardLoader";
import AuthPageError from "../components/AuthPageError";

export async function loader() {
  const user = axios
    .get("/api/v1/user/profile")
    .then(({ data: { user } }) => user);
  return defer({ user });
}

function Root() {
  const { user } = useLoaderData();

  return (
    <div className="flex h-full">
      <div className="hidden sm:flex basis-1/12 xl:basis-1/5 flex-col items-center gap-2 p-2 item-bg">
        <LogoCard />
        <div className="flex justify-center w-2/3">
          <Navbar />
        </div>
      </div>
      <div className="flex grow flex-col gap-4 p-4 bg">
        <AsyncComponent
          fallback={<UserCardLoader />}
          resolve={user}
          errorElement={<AuthPageError />}
        >
          {(user) => <UserCard {...user} />}
        </AsyncComponent>
        <div className="sm:hidden item-bg p-2 rounded-md shadow-md">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
export default Root;
