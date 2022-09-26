import React from "react";
import ReactDOM, { render } from "react-dom";

import { App } from ".";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
