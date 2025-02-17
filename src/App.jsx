import { useState } from "react";
import MenuHeader from "./components/MenuHeader";
import ReserveSection from "./components/contents/ReserveSection";
import Footer from "./components/Footer";
import ReserveForm from "./components/contents/ReserveForm";
import JejuMap from "./components/maps/JejuMap";

function App() {
  return (
    <div>
      <MenuHeader />
      <JejuMap>
        <ReserveForm />
      </JejuMap>
      {/* <ReserveSection /> */}
      <Footer />
    </div>
  );
}

export default App;