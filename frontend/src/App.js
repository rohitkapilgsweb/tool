import React from "react";
import { useRoutes } from "react-router-dom";
import { defaultProtect, protect } from "./utils/Routes";
import { withoutAuthRoute } from "./utils/helper";

function App() {
  const routing = useRoutes(protect);

  let pathName = window.location.pathname
    .toLowerCase()
    .replace(/^\/|\/$/g, "")
    .split("/");

  let checkIsWithoutAuthRoute = withoutAuthRoute.includes(
    pathName && pathName.length > 0 ? pathName[0] : "--"
  );

  const defaultRouting = useRoutes(defaultProtect);

  if (checkIsWithoutAuthRoute) {
    return <>{defaultRouting}</>;
  }
  return <>{routing}</>;
}
export default App;