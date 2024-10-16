import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import LottoPage from "../components/pages/LottoPage";
import RspPage from "../components/pages/RspPage";
import BoardListPage from "../components/pages/BoardListPage";
import BoardWritePage from "../components/pages/BoardWritePage";

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
  {
    path: "/boards",
    element: <App />,
    loader: () => "게시판",
    children: [
      {
        path: "/boards",
        loader: () => "게시판",
        element: <BoardListPage />,
      },
      {
        path: "/boards/write",
        loader: () => "글쓰기",
        element: <BoardWritePage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
