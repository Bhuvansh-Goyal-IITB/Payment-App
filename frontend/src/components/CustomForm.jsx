import { forwardRef } from "react";

const CustomForm = forwardRef(({ children, onSubmit, ...rest }, ref) => {
  return (
    <form
      className="bg-white shadow-xl w-5/6 sm:w-4/6 md:w-1/2 lg:w-1/3 xl:w-1/4 p-5 rounded-lg"
      onSubmit={onSubmit}
      ref={ref}
      {...rest}
    >
      {children}
    </form>
  );
});

export default CustomForm;
