import { formatDate } from "../utils/formatDate";
import UserInfo from "./UserInfo";

function TransactionItem({
  user: { email, firstName, lastName },
  received,
  timestamp,
  amount,
  stale,
}) {
  return (
    <div className={`${stale && "opacity-60"} flex flex-col item-bg`}>
      <div className="flex justify-between text p-2 pr-4">
        <UserInfo firstName={firstName} lastName={lastName} email={email} />
        <div className="hidden lg:flex items-center text-neutral-400 text-base xl:text-lg">
          {formatDate(timestamp)}
        </div>
        <div
          className={`${received ? "text-green-500" : "text-red-500"} flex font-bold items-center text-lg xl:text-xl p-2`}
        >
          {received ? "+" : "-"}₹{amount}
        </div>
      </div>

      <div className="flex justify-center lg:hidden items-center text-neutral-400 text-sm md:text-base p-4 pt-0">
        {formatDate(timestamp)}
      </div>
    </div>
  );
}

export default TransactionItem;
