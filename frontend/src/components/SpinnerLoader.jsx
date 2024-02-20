function SpinnerLoader() {
  return (
    <div className="flex justify-center p-4">
      <div className="h-8 w-8 rounded-full animate-spin border-[3px] border-neutral-900 dark:border-neutral-100 border-t-transparent dark:border-t-transparent" />
    </div>
  );
}

export default SpinnerLoader;
