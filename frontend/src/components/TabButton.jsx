function TabButton({ children, selected, onClick }) {
  return (
    <div
      className={`rounded-md p-2 hover:cursor-pointer font-medium ${selected ? "dark:text-neutral-950 text-neutral-50 bg-neutral-950 dark:bg-neutral-50" : "text-neutral-950 dark:text-neutral-50 hover:text-white dark:hover:text-black hover:bg-neutral-950 dark:hover:bg-neutral-50"}  transition-colors disabled:opacity-70 disabled:cursor-not-allowed`}
      onClick={onClick}
    >
      <div>{children}</div>
    </div>
  );
}

export default TabButton;
