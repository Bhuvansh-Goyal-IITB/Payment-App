import { memo } from "react";

const UserCard = memo(({ balance, firstName, lastName, email }) => {
  return (
    <div className="flex item-bg text flex-col justify-center md:justify-evenly gap-4 w-full p-8 rounded-md shadow-md">
      <div className="flex flex-col font-serif text-center sm:text-left ">
        <div>
          <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {firstName} {lastName}
          </div>
          <div className="text-center sm:text-left text-sm md:text-md lg:text-lg xl:text-xl text-neutral-400">
            {email}
          </div>
        </div>
      </div>
      <div className="flex items-center sm:justify-start justify-center gap-2">
        {balance == "" ? (
          <div className="h-4 w-4 rounded-full animate-spin border-[2px] border-t-transparent border-black dark:border-white" />
        ) : (
          <div className="flex font-bold items-center gap-2 text-2xl md:text-3xl lg:text-4xl xl:text-5xl text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-12 xl:h-12"
            >
              <defs>
                <linearGradient
                  id="iconGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" style={{ stopColor: "#FFCB00" }} />
                  <stop offset="100%" style={{ stopColor: "#FF9500" }} />
                </linearGradient>
              </defs>
              <path
                fill="url(#iconGradient)"
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
                clipRule="evenodd"
              />
            </svg>
            {parseFloat(balance).toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
});

export default UserCard;
