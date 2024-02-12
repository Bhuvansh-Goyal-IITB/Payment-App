import { forwardRef } from "react";

const Button = forwardRef(({ children, onClick, ...rest }, ref) => {
  return (
    <button
      className="rounded-md p-2 px-4 font-medium text-white hover:bg-gradient-dark bg-gradient-medium disabled:opacity-70 disabled:cursor-not-allowed"
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      <div className="text-white">{children}</div>
    </button>
  );
});

export default Button;
