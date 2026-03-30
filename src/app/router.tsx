import { Navigate, createBrowserRouter, useParams } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ThemeHomePage } from "../pages/ThemeHomePage";
import { ThemeIdeaDetailPage } from "../pages/ThemeIdeaDetailPage";
import { ThemeIdeasPage } from "../pages/ThemeIdeasPage";

function LegacyPaidLeaveIdeaRedirect() {
  const { slug } = useParams();
  return <Navigate replace to={slug ? `/paid-leave/ideas/${slug}` : "/paid-leave/ideas"} />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "paid-leave", element: <ThemeHomePage themeKey="paid-leave" /> },
      { path: "paid-leave/ideas", element: <ThemeIdeasPage themeKey="paid-leave" /> },
      { path: "paid-leave/ideas/:slug", element: <ThemeIdeaDetailPage themeKey="paid-leave" /> },
      { path: "sleep", element: <ThemeHomePage themeKey="sleep" /> },
      { path: "sleep/ideas", element: <ThemeIdeasPage themeKey="sleep" /> },
      { path: "sleep/ideas/:slug", element: <ThemeIdeaDetailPage themeKey="sleep" /> },
      { path: "ideas", element: <Navigate replace to="/paid-leave/ideas" /> },
      { path: "ideas/:slug", element: <LegacyPaidLeaveIdeaRedirect /> },
    ],
  },
]);
