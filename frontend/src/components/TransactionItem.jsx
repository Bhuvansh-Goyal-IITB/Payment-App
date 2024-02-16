import { formatDate } from "../utils/formatDate";
import UserInfo from "./UserInfo";

function TransactionItem({
  _id,
  user: { email, firstName, lastName },
  received,
  timestamp,
  amount,
  stale,
}) {
  return (
    <div
      className={`${stale && "opacity-60"} hover:cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-between item-bg text p-2 pr-4`}
    >
      <UserInfo firstName={firstName} lastName={lastName} email={email} />
      <div className="flex items-center text text-lg">
        {formatDate(timestamp)}
      </div>
      <div
        className={`${received ? "text-green-500" : "text-red-500"} flex font-bold items-center text-xl p-2`}
      >
        {received ? "+" : "-"}₹{amount}
      </div>
    </div>
  );
}

export default TransactionItem;
