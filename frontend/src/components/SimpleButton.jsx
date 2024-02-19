import { forwardRef } from "react";

const SimpleButton = forwardRef(({ children, onClick, ...rest }, ref) => {
  return (
    <button
      className="rounded-md p-2 text-xs sm:text-sm md:text-base font-medium dark:border-white border-neutral-900 border-[1px] text-neutral-950 hover:text-white dark:text-neutral-50 dark:hover:text-black hover:bg-neutral-950 dark:hover:bg-neutral-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      <div>{children}</div>
    </button>
  );
});

export default SimpleButton;
