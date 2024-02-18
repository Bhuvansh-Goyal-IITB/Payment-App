import axios from "axios";
import UserCard from "../components/UserCard";
import LogoCard from "../components/LogoCard";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

export async function loader() {
  const {
    data: { user },
  } = await axios.get("/api/v1/user/profile");
  return { user };
}

function Root() {
  const { user: userProfile } = useLoaderData();

  return (
    <div className="flex h-full">
      <div className="flex basis-1/12 xl:basis-1/5 flex-col items-center gap-2 p-2 item-bg">
        <LogoCard />
        <div className="flex justify-center w-2/3">
          <Navbar />
        </div>
      </div>
      <div className="flex grow flex-col gap-4 p-4 bg">
        <UserCard {...userProfile} />
        <Outlet />
      </div>
    </div>
  );
}
export default Root;
