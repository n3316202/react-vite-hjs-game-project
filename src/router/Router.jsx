import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import Footer from "../components/layout/Footer";
import LottoBall from "../components/lotto/LottoBall";
import LottoPage from "../components/pages/LottoPage";

const routes = [
  {
    path: "/",
    element: <App />,
    loader: () => "로또",
    children: [
      {
        path: "/",
        loader: () => "로또",
        element: <LottoPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
