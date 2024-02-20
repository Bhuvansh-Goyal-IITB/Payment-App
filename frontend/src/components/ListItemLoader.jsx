function ListItemLoader() {
  return (
    <div className="flex flex-col item-bg p-2">
      <div className="flex items-center gap-2 p-2 w-[12rem]">
        <div>
          <div className="w-8 h-8 grow rounded-full bg-neutral-500 animate-pulse" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-3 rounded-md w-full animate-pulse bg-neutral-500" />
          <div className="h-3 rounded-md w-[70%] animate-pulse bg-neutral-500" />
        </div>
      </div>
    </div>
  );
}

export default ListItemLoader;
