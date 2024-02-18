import { useNavigate } from "react-router-dom";
import SimpleButton from "./SimpleButton";
import UserInfo from "./UserInfo";

function UserListItem({ stale, id, firstName, lastName, email }) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex ${stale ? "opacity-60" : ""} p-2 item-bg items-center justify-between`}
    >
      <UserInfo firstName={firstName} lastName={lastName} email={email} />
      <div className="p-2">
        <SimpleButton onClick={() => navigate(`/transfer/${id}`)}>
          Send Money
        </SimpleButton>
      </div>
    </div>
  );
}

export default UserListItem;
