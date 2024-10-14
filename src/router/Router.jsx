import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import LottoPage from "../components/pages/LottoPage";
import RspPage from "../components/pages/RspPage";

const routes = [
  {
    path: "/",
    element: <App />,
    loader: () => "가위바위보",
    children: [
      {
        path: "/",
        loader: () => "가위바위보",
        element: <RspPage />,
      },
    ],
  },
  {
    path: "/lotto",
    element: <App />,
    loader: () => "로또",
    children: [
      {
        path: "/lotto",
        loader: () => "로또",
        element: <LottoPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
