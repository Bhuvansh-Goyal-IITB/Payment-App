import React from "react";
import { Await } from "react-router-dom";

function AsyncComponent({ fallback, resolve, children, errorElement }) {
  return (
    <React.Suspense fallback={fallback}>
      <Await resolve={resolve} errorElement={errorElement}>
        {children}
      </Await>
    </React.Suspense>
  );
}

export default AsyncComponent;
