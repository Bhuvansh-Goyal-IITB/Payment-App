import { forwardRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const FormInput = forwardRef(({ type, ...rest }, ref) => {
  let [passwordVisible, setPasswordVisible] = useState(false);
  let [inputType, setInputType] = useState(type);

  return (
    <div className="flex flex-col gap-1 relative">
      <input
        type={inputType}
        className="text-slate-700 p-2 rounded-[0.2rem] border-neutral-300 border-[1px] focus:outline-blue-500"
        ref={ref}
        {...rest}
      />
      {type == "password" && (
        <div
          onClick={() => {
            if (passwordVisible) {
              setInputType("password");
            } else {
              setInputType("text");
            }
            setPasswordVisible((prev) => !prev);
          }}
          className="absolute text-neutral-400 hover:text-neutral-500 hover:cursor-pointer right-3 top-[calc(50%-0.625rem)]"
        >
          {passwordVisible ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </div>
      )}
    </div>
  );
});

export default FormInput;
