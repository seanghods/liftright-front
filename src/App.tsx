import { Theme, useTheme } from "react-daisyui";
import Landing from "./containers/Landing.tsx";
import { Route, Routes } from "react-router-dom";
import { Topbar } from "./components/Topbar.tsx";
import { Footer } from "./components/Footer.tsx";
import { ThemeToggler } from "./components/ThemeToggler.tsx";
import Upload from "./containers/Upload.tsx";
import { ScrollToTop } from "./utils/helpers.ts";

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
        </Routes>
        <Footer />
        <ThemeToggler />
      </Theme>
    </>
  );
}

export default App;
