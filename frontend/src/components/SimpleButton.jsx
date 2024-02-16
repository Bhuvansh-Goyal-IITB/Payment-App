function SimpleButton({ children, onClick }) {
  return (
    <button
      className="rounded-md p-2 font-medium dark:border-white border-neutral-900 border-[1px] text-neutral-950 hover:text-white dark:text-neutral-50 dark:hover:text-black hover:bg-neutral-950 dark:hover:bg-neutral-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      <div>{children}</div>
    </button>
  );
}

export default SimpleButton;
