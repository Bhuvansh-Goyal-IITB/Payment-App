import axios from "axios";
import { memo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserCard = memo(({ balance, firstName, lastName, email }) => {
  const navigate = useNavigate();
  return (
    <div className="hidden sm:flex flex-col justify-center md:justify-evenly gap-4 w-full bg-white pl-6 xl:pl-8 p-5 rounded-md shadow-md">
      <div className="flex flex-col font-serif text-center sm:text-left ">
        <div className="flex justify-between pr-4">
          <div>
            <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              {firstName} {lastName}
            </div>
            <div className="text-center sm:text-left text-sm md:text-md lg:text-lg xl:text-xl text-neutral-400">
              {email}
            </div>
          </div>
          <div className="text-sm md:text-md lg:text-lg xl:text-xl text-stone-700">
            <div
              onClick={() => {
                axios
                  .get("/api/v1/user/logout")
                  .then(() => {
                    toast.success("Logged out successfully!");
                    navigate("/login");
                  })
                  .catch(() => {
                    toast.error("Server Error!");
                  });
              }}
              className="hover:cursor-pointer hover:text-black hover:underline"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center sm:justify-start justify-center gap-2">
        {balance == "" ? (
          <div className="h-4 w-4 rounded-full animate-spin border-[2px] border-t-transparent border-black" />
        ) : (
          <div className="flex items-center gap-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gradient-neutral-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16"
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
            {balance}
          </div>
        )}
      </div>
    </div>
  );
});

export default UserCard;
