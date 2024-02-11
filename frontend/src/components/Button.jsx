import { forwardRef } from "react";

const Button = forwardRef(({ children, onClick, ...rest }, ref) => {
  return (
    <button
      className="rounded-md p-2 text-white bg-gradient-dark disabled:opacity-70 disabled:cursor-not-allowed"
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      <div className="text-white">{children}</div>
    </button>
  );
});

export default Button;
