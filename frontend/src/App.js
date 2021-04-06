import React from "react";
import Footer from "./components/Footer";
import NavbarComponent from "./components/NavbarComponent";
import PrintInvoice from "./features/PrintInvoice";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Footer />
      {/* <PrintInvoice /> */}
    </div>
  );
}

export default App;
