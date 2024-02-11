import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

function FormErrorItem({ showCondition, errorMessage }) {
  return (
    <div
      aria-hidden={!showCondition}
      className="absolute p-1 rounded-[0.2rem] bg-red-200 text-sm text-red-500 translate-y-0 aria-hidden:-translate-y-[105%] transition-transform"
    >
      <span>
        <ExclamationCircleIcon className="inline w-5 h-5 -translate-y-[2px]" />{" "}
      </span>
      {errorMessage}
    </div>
  );
}

export default FormErrorItem;
