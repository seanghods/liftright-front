import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // This can also be omitted as 'auto' is the default behavior
    });
  }, [pathname]);

  return null;
}
