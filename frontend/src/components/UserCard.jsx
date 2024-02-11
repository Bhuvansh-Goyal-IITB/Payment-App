import { memo } from "react";

const UserCard = memo(({ balance, firstName, lastName, email }) => {
  return (
    <div className="flex flex-col justify-between bg-white sm:flex-row items-center gap-3 p-5 rounded-md shadow-md">
      <div className="flex items-center gap-2">
        <div className="text-xl text-gradient-neutral-600 font-bold">
          Your Balance
        </div>
        {balance == "" ? (
          <div className="h-4 w-4 rounded-full animate-spin border-[2px] border-t-transparent border-black" />
        ) : (
          <div className="text-xl text-gradient-neutral-600">₹{balance}</div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="text-center text-lg">
          {firstName} {lastName}
        </div>
        <div className="text-center text-sm text-neutral-300">{email}</div>
      </div>
    </div>
  );
});

export default UserCard;
