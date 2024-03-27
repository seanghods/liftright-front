import { Theme, useTheme } from "react-daisyui";
import { Route, Routes } from "react-router-dom";
import { Topbar, Footer } from "@/components";
import posthog from "posthog-js";
// import { ThemeToggler } from "./components/ThemeToggler.tsx";
import { ScrollToTop } from "@/utils/helpers.ts";
import {
  Landing,
  Upload,
  Response,
  Register,
  Login,
  ContactUs,
  TermsOfService,
  PrivacyPolicy,
  NotFound,
} from "@/containers";
import { useEffect, useState } from "react";
import { API_ROUTES } from "./utils/constants";
import { useUser } from "./UserContext";

function App() {
  const { user, setUser } = useUser();
  const [fullLoadingPage, setFullLoadingPage] = useState<boolean>(false);
  // const { theme } = useTheme();
  useEffect(() => {
    async function checkAuthenticationStatus() {
      setFullLoadingPage(true);
      try {
        const response = await fetch(API_ROUTES.checkSession, {
          credentials: "include",
        });
        const data = await response.json();

        if (data.isAuthenticated) {
          setUser(data.user);
          posthog.identify(data.user.email, {
            email: data.user.email,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to check authentication status:", error);
      }
      setFullLoadingPage(false);
    }
    checkAuthenticationStatus();
  }, [setUser]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Theme className="flex-1 flex flex-col min-h-screen" dataTheme={"dark"}>
          <Topbar />
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/response/:id" element={<Response />} />
              <Route path="/log-in" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          {/* <ThemeToggler /> */}
        </Theme>
      </div>
    </>
  );
}

export default App;
