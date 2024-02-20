import React from "react";
import axios from "axios";
import { Await, defer, useLoaderData } from "react-router-dom";

export function testLoader() {
  const user = axios
    .get("/api/v1/user/profile")
    .then(({ data: { user } }) => user);
  return defer({ user });
}

function DeferTest() {
  const data = useLoaderData();

  return (
    <div className="w-full h-full item-bg text">
      DeferTest
      <React.Suspense fallback={<div>Loading ...</div>}>
        <Await resolve={data.user}>
          {(user) => <div>User's name is {user.firstName}</div>}
        </Await>
      </React.Suspense>
    </div>
  );
}

export default DeferTest;
