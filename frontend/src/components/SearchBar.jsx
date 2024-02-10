import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { forwardRef } from "react";
const SearchBar = forwardRef(({ ...rest }, ref) => {
  return (
    <div className="flex relative items-center rounded-md shadow-md justify-center">
      <MagnifyingGlassIcon className="w-5 h-5 text-stone-500 absolute left-2.5" />
      <input
        className="grow rounded-md pl-10 text-lg py-2 focus:border-blue-500 border-transparent border-2 outline-none"
        type="text"
        ref={ref}
        {...rest}
      />
    </div>
  );
});

export default SearchBar;
