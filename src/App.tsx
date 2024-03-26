import { Theme, useTheme } from "react-daisyui";
import { Route, Routes } from "react-router-dom";
import { Topbar, Footer } from "@/components";
// import { ThemeToggler } from "./components/ThemeToggler.tsx";
import { ScrollToTop } from "@/utils/helpers.ts";
import { Landing, Upload, Response, Register, Login } from "@/containers";

function App() {
  // const { theme } = useTheme();

  return (
    <>
      <ScrollToTop />
      <Theme dataTheme={"dark"}>
        <Topbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/response/:id" element={<Response />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
        {/* <ThemeToggler /> */}
      </Theme>
    </>
  );
}

export default App;
