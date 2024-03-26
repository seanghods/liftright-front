import { Theme, useTheme } from "react-daisyui";
import Landing from "./containers/Landing.tsx";
import { Route, Routes } from "react-router-dom";
import { Topbar } from "./components/Topbar.tsx";
import { Footer } from "./components/Footer.tsx";
import { ThemeToggler } from "./components/ThemeToggler.tsx";
import Upload from "./containers/Upload.tsx";
import { ScrollToTop } from "./utils/helpers.ts";
import Response from "./containers/Response.tsx";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <ScrollToTop />
      <Theme dataTheme={"dark"}>
        <Topbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/response/:id" element={<Response />} />
        </Routes>
        <Footer />
        {/* <ThemeToggler /> */}
      </Theme>
    </>
  );
}

export default App;
