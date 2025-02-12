import { useState } from "react";
import MenuHeader from "./components/MenuHeader";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <MenuHeader />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
