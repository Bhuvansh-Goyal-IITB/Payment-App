function SpinnerText({ loading, children }) {
  return (
    <div className="relative flex w-full items-center justify-center gap-2">
      <div className="relative flex items-center">
        <div className="absolute overflow-clip -left-5 w-4 h-4">
          <div
            aria-hidden={!loading}
            className="transition-transform translate-x-0 aria-hidden:translate-x-4"
          >
            <div className="h-4 w-4 rounded-full animate-spin border-[2px] border-t-transparent border-white" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default SpinnerText;
