import { forwardRef } from "react";

const LabelledInput = forwardRef(({ label, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg text-gradient-neutral-700">{label}</label>
      <input
        className="text-slate-700 p-2 rounded-md border-2 border-gray-200"
        ref={ref}
        {...rest}
      />
    </div>
  );
});

export default LabelledInput;
