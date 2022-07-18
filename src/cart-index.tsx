import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartApp } from "./components/cart-app";

import "./index.scss";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <CartApp />
  </StrictMode>,
);
