import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
//import { ThemeContextProvider } from "./components/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  // <React.StrictMode>
  //   <ThemeContextProvider>
  //     <App />
  //   </ThemeContextProvider>
  // </React.StrictMode>
);
// ReactDOM.render(<App />, document.getElementById("root"));
