import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      {/*⭐️ URL에 따라 변경되는 부분 ⭐️ */}
      <Footer></Footer>
    </>
  );
}

export default App;
