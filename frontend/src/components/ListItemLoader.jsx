function ListItemLoader() {
  return (
    <div className="flex flex-col item-bg p-2 py-3">
      <div className="flex items-center gap-2 p-2 w-[12rem]">
        <div>
          <div className="w-8 h-8 md:w-10 md:h-10 grow rounded-full bg-neutral-300 dark:bg-neutral-500 animate-pulse" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-3 rounded-sm w-full bg-neutral-300 dark:bg-neutral-500 animate-pulse" />
          <div className="h-3 rounded-sm w-[70%] bg-neutral-300 dark:bg-neutral-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default ListItemLoader;
