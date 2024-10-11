import { useState } from "react";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet />
      {/*⭐️ URL에 따라 변경되는 부분 ⭐️ */}
      <Footer></Footer>
    </>
  );
}

export default App;
