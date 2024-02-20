import React from "react";
import LogoCard from "./LogoCard";

function UserCardLoader() {
  return (
    <div className="flex item-bg text sm:flex-col justify-center md:justify-evenly gap-4 w-full p-8 rounded-md shadow-md">
      <div className="sm:hidden">
        <LogoCard />
      </div>
      <div className="grow flex flex-col gap-4">
        <div className="flex flex-col text-left gap-4">
          <div className="h-4 rounded-md w-[8rem] sm:w-[12rem] animate-pulse bg-neutral-500" />
          <div className="h-4 rounded-md w-[8rem] sm:w-[12rem] animate-pulse bg-neutral-500" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="h-4 rounded-md w-[6rem] sm:w-[10rem] animate-pulse bg-neutral-500" />
        </div>
      </div>
    </div>
  );
}

export default UserCardLoader;
