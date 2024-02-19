import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { forwardRef } from "react";
const SearchBar = forwardRef(({ ...rest }, ref) => {
  return (
    <div className="flex max-h-12 min-h-12 rounded-md overflow-clip relative items-center shadow-md justify-center">
      <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 absolute left-2.5" />
      <input
        className="w-full item-bg text pl-10 text-lg py-4 outline-none"
        type="text"
        ref={ref}
        {...rest}
      />
    </div>
  );
});

export default SearchBar;
