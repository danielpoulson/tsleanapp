import React from "react";
import Mattec from "./components/main";
import Line from "./components/line";

const Routes = {
  "/": () => <Mattec />,
  "/line/:id": ({ id }: any) => <Line id={id} />
};
export default Routes;
