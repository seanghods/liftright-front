import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "@/index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserProvider } from "./UserContext";
AOS.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);
