import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AppLayout() {
  const location = useLocation();
  const isDiagnosticRoute = location.pathname === "/diagnostic";

  return (
    <>
      <Header />
      <Outlet />
      {!isDiagnosticRoute ? <Footer /> : null}
    </>
  );
}
