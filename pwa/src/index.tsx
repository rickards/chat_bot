import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";

console.log(`[APP] running in ${process.env.NODE_ENV} mode.`);
if (process.env.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(registration => {
        console.log("[SW] service Worker is registered", registration.scope);
      })
      .catch(err => {
        console.error("[SW] service Worker registration failed:", err);
      });
  }
}

const root = document.getElementById("root");

ReactDOM.render(<App />, root);
