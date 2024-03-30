import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "@/index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserProvider } from "./UserContext";
import posthog from "posthog-js";

posthog.init("phc_SJUrSb0vab6drYWpq1Dci1hfQoNBll4SEVpTcq80on3", {
  api_host: "https://app.posthog.com",
});
AOS.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);
