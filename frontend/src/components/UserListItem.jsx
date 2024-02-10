import Button from "./Button";

function UserListItem({ firstName, lastName }) {
  return (
    <div className="flex rounded-md bg-white items-center justify-between shadow-md">
      <div className="flex items-center gap-4 p-2">
        <div className="flex w-10 h-10 items-center justify-center bg-gradient-dark text-white rounded-full p-2">
          {firstName[0].toUpperCase()}
          {lastName[0].toUpperCase()}
        </div>
        <div className="text-lg">
          {firstName} {lastName}
        </div>
      </div>
      <div className="p-2">
        <Button>Send Money</Button>
      </div>
    </div>
  );
}

export default UserListItem;
