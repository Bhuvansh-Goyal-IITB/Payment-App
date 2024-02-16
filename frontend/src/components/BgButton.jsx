function BgButton({ children, onClick, ...rest }) {
  return (
    <button
      className="rounded-md p-2 font-medium text-hoverable-inverse bg-neutral-900 hover:bg-black dark:bg-neutral-100 dark:hover:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      onClick={onClick}
      {...rest}
    >
      <div>{children}</div>
    </button>
  );
}

export default BgButton;
