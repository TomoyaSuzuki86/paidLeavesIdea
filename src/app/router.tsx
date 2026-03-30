import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { HomePage } from "../pages/HomePage";
import { IdeaDetailPage } from "../pages/IdeaDetailPage";
import { IdeasPage } from "../pages/IdeasPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "ideas", element: <IdeasPage /> },
      { path: "ideas/:slug", element: <IdeaDetailPage /> },
    ],
  },
]);
