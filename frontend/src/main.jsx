import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Index from "./routes/index/Index.jsx";
import { BitteWalletContextProvider } from "@mintbase-js/react";
import "@near-wallet-selector/modal-ui/styles.css";
import Docs from "./routes/docs/Docs.jsx";
import Home from "./routes/docs/pages/home/Home.jsx";
import Upload from "./routes/upload/Upload.jsx";

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
        ],
      },
      {
        path: "upload",
        element: <Upload />,
      },
    ],
  },
]);

const setup = {
  contractAddress:
    import.meta.env.VITE_CONTRACT_ADDRESS || "mintspace2.testnet",
  network: import.meta.env.VITE_NETWORK || "testnet",
  callbackUrl:
    import.meta.env.VITE_CALLBACK_URL ||
    (typeof window !== "undefined" ? window.location.origin : ""),
};

createRoot(document.getElementById("root")).render(
  <BitteWalletContextProvider {...setup}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </BitteWalletContextProvider>
);
