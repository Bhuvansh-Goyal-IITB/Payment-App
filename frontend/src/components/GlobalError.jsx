import React from "react";
import { useRouteError } from "react-router-dom";

function GlobalError() {
  const error = useRouteError();

  if (error.status == 404) {
    return (
      <div className="w-full h-full item-bg flex items-center justify-center text">
        <div className="flex flex-col gap-2 items-center">
          <div className="text-6xl font-bold">404</div>
          <div className="text-2xl text-neutral-400 font-serif">Not found</div>
        </div>
      </div>
    );
  }

  if (error.response) {
    return (
      <div className="w-full h-full item-bg flex items-center justify-center text">
        <div className="flex flex-col gap-2 items-center">
          <div className="text-6xl font-bold">{error.response.status}</div>
          <div className="text-2xl text-neutral-400 font-serif">
            {error.response.data.message ?? "Some error occured"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full item-bg flex items-center justify-center text text-4xl font-bold">
      Unknown Error Occured
    </div>
  );
}

export default GlobalError;
