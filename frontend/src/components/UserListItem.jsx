import SimpleButton from "./SimpleButton";
import UserInfo from "./UserInfo";

function UserListItem({ stale, firstName, lastName, email }) {
  return (
    <div
      className={`flex ${stale ? "opacity-60" : ""} p-2 item-bg items-center justify-between`}
    >
      <UserInfo firstName={firstName} lastName={lastName} email={email} />
      <div className="p-2">
        <SimpleButton>Send Money</SimpleButton>
      </div>
    </div>
  );
}

export default UserListItem;
