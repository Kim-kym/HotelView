import { useState } from "react";
import MenuHeader from "./components/MenuHeader";
import ReserveSection from "./components/contents/ReserveSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <MenuHeader />
      <ReserveSection />
      <Footer />
    </div>
  );
}

export default App;
