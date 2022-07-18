import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TugboatApp } from "./components/tugboat-app";

import "./index.scss";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <TugboatApp />
  </StrictMode>,
);
