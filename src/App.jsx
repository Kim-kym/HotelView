import { useState } from "react";
import MenuHeader from "./components/MenuHeader";
import ReserveSection from "./components/contents/ReserveSection";
import Footer from "./components/Footer";
import JejuMap from "./components/maps/JejuMap";

function App() {
  return (
    <div>
      <MenuHeader />
      <JejuMap />
      {/* <ReserveSection /> */}
      <Footer />
    </div>
  );
}

export default App;
