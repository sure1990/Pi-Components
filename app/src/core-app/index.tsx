import { createRoot } from "react-dom/client";
import App from "./components/app";
import "bootstrap/dist/css/bootstrap.min.css";
const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <div className="p-2">
    <App />
  </div>
);
