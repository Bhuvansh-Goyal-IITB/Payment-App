function UserInfo({ firstName, lastName, email }) {
  return (
    <div className="flex items-center gap-4 p-2 text">
      <div className="flex text-inverse item-bg-inverse w-10 h-10 items-center justify-center rounded-full p-2">
        {firstName[0].toUpperCase()}
        {lastName[0].toUpperCase()}
      </div>
      <div className="flex flex-col">
        <div className="text-xl">
          {firstName} {lastName}
        </div>
        <div className="text-sm text-neutral-400">{email}</div>
      </div>
    </div>
  );
}

export default UserInfo;
