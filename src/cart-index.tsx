import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Shutterbug from "shutterbug";
import { CartApp } from "./components/cart-app";

import "./index.scss";

// Support Shutterbug snapshots.
Shutterbug.enable();

const rootElement = document.getElementById("app");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <CartApp />
  </StrictMode>,
);
