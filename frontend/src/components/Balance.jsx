import { memo } from "react";

const Balance = memo(({ balance }) => {
  console.log("Balance");
  return (
    <div className="flex bg-white justify-center sm:justify-start items-center gap-3 p-5 rounded-md shadow-md">
      <div className="text-xl text-gradient-neutral-600 font-bold">
        Your Balance
      </div>
      <div className="text-xl text-gradient-neutral-600">₹{balance}</div>
      <div className="text-lg"> </div>
    </div>
  );
});

export default Balance;
