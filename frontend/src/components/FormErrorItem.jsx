import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

function FormErrorItem({ showCondition, errorMessage }) {
  return (
    <div
      aria-hidden={!showCondition}
      className="absolute text-red-500 translate-y-0 aria-hidden:-translate-y-[105%] transition-transform"
    >
      <span>
        <ExclamationCircleIcon className="text-red-500 inline w-5 h-5 -translate-y-[2px]" />{" "}
      </span>
      {errorMessage}
    </div>
  );
}

export default FormErrorItem;
