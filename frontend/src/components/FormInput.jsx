import { forwardRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const FormInput = forwardRef(({ type, label, ...rest }, ref) => {
  let [passwordVisible, setPasswordVisible] = useState(false);
  let [inputType, setInputType] = useState(type);

  return (
    <div className="flex flex-col gap-1 relative">
      <input
        type={inputType}
        id={label}
        className="text-slate-700 p-2 rounded-md outline-none border-neutral-300 border-2 focus:border-blue-500 focus:invalid:border-red-500 invalid:border-red-500"
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
          className="absolute text-neutral-500 hover:text-neutral-600 hover:cursor-pointer right-4 top-[calc(50%-0.75rem)]"
        >
          {passwordVisible ? (
            <EyeSlashIcon className="w-6 h-6" />
          ) : (
            <EyeIcon className="w-6 h-6" />
          )}
        </div>
      )}
    </div>
  );
});

export default FormInput;
