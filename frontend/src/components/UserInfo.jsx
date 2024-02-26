function UserInfo({ firstName, lastName, email }) {
  return (
    <div className="flex items-center gap-4 p-2 text">
      <div className="flex text-inverse item-bg-inverse w-8 h-8 md:w-10 md:h-10 text-xs md:text-base items-center justify-center rounded-full p-2">
        {firstName[0].toUpperCase()}
        {lastName[0].toUpperCase()}
      </div>
      <div className="flex flex-col">
        <div className="text-xs md:text-base lg:text-lg xl:text-xl">
          {firstName} {lastName}
        </div>
        <div className="max-[450px]:w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis text-xs md:text-sm text-neutral-400">
          {email}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
