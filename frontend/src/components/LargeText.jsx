function LargeText({ children }) {
  return (
    <div className="text-4xl text-center py-2 dark:text-gradient-neutral-200 text-gradient-neutral-600 font-bold">
      {children}
    </div>
  );
}

export default LargeText;
