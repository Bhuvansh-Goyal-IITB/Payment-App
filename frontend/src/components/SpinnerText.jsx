function SpinnerText({ loading, children }) {
  return (
    <div className="relative flex w-full items-center justify-center gap-2">
      <div className="relative flex gap-2 items-center">
        <div className="absolute overflow-clip -left-5 w-4 h-4">
          <div
            aria-hidden={!loading}
            className="animate-spinner-popout translate-x-0 aria-hidden:translate-x-5"
          >
            <div className="h-4 w-4 rounded-full animate-spin border-[2px] dark:border-neutral-900 border-neutral-100 border-t-transparent dark:border-t-transparent" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default SpinnerText;
