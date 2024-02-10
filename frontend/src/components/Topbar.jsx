import { UserCircleIcon } from "@heroicons/react/24/solid";
import { memo } from "react";

const Topbar = memo(() => {
  return (
    <div className="flex bg-white justify-between items-center px-3 shadow-md">
      <div className="text-xl p-2 text-gradient-neutral-700 font-bold">
        PayTM
      </div>
      <div className="flex gap-1 items-center">
        <div className="transition-colors hover:cursor-pointer hover:text-black text-stone-800 p-2 m-2 rounded-md">
          Logout
        </div>
        <UserCircleIcon className="w-8 h-8 text-stone-800 hover:cursor-pointer"></UserCircleIcon>
      </div>
    </div>
  );
});

export default Topbar;
