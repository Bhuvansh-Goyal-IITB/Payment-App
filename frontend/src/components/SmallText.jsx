function SmallText({ children }) {
  return (
    <div className="text-xl dark:font-normal font-normal dark:text-gradient-neutral-100 text-gradient-neutral-500 text-center">
      {children}
    </div>
  );
}

export default SmallText;
