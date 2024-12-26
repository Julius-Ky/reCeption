import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Index from "./routes/index/Index.jsx";
import Docs from "./routes/docs/Docs.jsx";
import Home from "./routes/docs/pages/home/Home.jsx";
import Upload from "./routes/upload/Upload.jsx";
import GettingStarted from "./routes/docs/pages/getting-started/GettingStarted.jsx";
import Console from "./routes/dashboard/pages/console/Console.jsx";
import Dashboard from "./routes/dashboard/Dashboard.jsx";
import Overview from "./routes/dashboard/pages/overview/Overview.jsx";
import Inspection from "./routes/dashboard/pages/inspection/Inspection.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "docs",
        element: <Docs />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "getting-started",
            element: <GettingStarted />,
          },
        ],
      },
      {
        path: "upload",
        element: <Upload />,
      },
      {
        path: "console",
        element: <Console />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "inspection",
            element: <Inspection />,
          },
          {
            path: "api-keys",
            element: <Console />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
