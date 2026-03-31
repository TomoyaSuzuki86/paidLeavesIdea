import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

export function AppLayout() {
  const location = useLocation();
  const isDiagnosticRoute = location.pathname === "/diagnostic";

  return (
    <>
      <ScrollToTopOnRouteChange />
      <Header />
      <Outlet />
      {!isDiagnosticRoute ? <Footer /> : null}
    </>
  );
}
