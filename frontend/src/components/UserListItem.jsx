import Button from "./Button";

function UserListItem({ stale, firstName, lastName, email }) {
  console.log(stale);
  return (
    <div
      className={`flex ${stale ? "opacity-70" : ""} bg-white items-center justify-between shadow-md`}
    >
      <div className="flex items-center gap-4 p-2">
        <div className="flex w-10 h-10 items-center justify-center bg-gradient-dark text-white rounded-full p-2">
          {firstName[0].toUpperCase()}
          {lastName[0].toUpperCase()}
        </div>
        <div className="flex flex-col">
          <div className="text-center text-lg">
            {firstName} {lastName}
          </div>
          <div className="text-center text-sm text-neutral-300">{email}</div>
        </div>
      </div>
      <div className="p-2">
        <Button>Send Money</Button>
      </div>
    </div>
  );
}

export default UserListItem;
