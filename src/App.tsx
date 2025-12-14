import React, { useRef } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Featured from "./components/Featured";
import About from "./components/About";
import SignatureItems from "./components/SignatureItems";
import AllItemsPage from "./components/AllItems";
import Footer from "./components/Footer";

import s1 from "./images/s1.jpg";
import s2 from "./images/s2.jpg";
import s3 from "./images/s3.jpg";
import s4 from "./images/s4.jpg";
import s5 from "./images/s5.jpg";
import s6 from "./images/s6.jpg";
import s7 from "./images/s7.jpg";
import s8 from "./images/s8.jpg";
import s9 from "./images/s9.jpg";
import s10 from "./images/s10.jpg";
import s11 from "./images/s11.jpg";
import s12 from "./images/s12.jpg";

export type SignaturedItem = {
  id: number;
  name: string;
  price: string;
  image: string;
};

export const allSignatureItems: SignaturedItem[] = [
  { id: 1, name: "item 1", price: "MMK 000,000", image: s1 },
  { id: 2, name: "item 2", price: "MMK 000,000", image: s2 },
  { id: 3, name: "item 3", price: "MMK 000,000", image: s3 },
  { id: 4, name: "item 4", price: "MMK 000,000", image: s4 },
  { id: 5, name: "item 5", price: "MMK 000,000", image: s5 },
  { id: 6, name: "item 6", price: "MMK 000,000", image: s6 },
  { id: 7, name: "item 7", price: "MMK 000,000", image: s7 },
  { id: 8, name: "item 8", price: "MMK 000,000", image: s8 },
  { id: 9, name: "item 9", price: "MMK 000,000", image: s9 },
  { id: 10, name: "item 10", price: "MMK 000,000", image: s10 },
  { id: 11, name: "item 11", price: "MMK 000,000", image: s11 },
  { id: 12, name: "item 12", price: "MMK 000,000", image: s12 },
];

const signatureItems = allSignatureItems.slice(0, 3);

const App: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home scrollToFooter={scrollToFooter} />
              <Featured />
              <SignatureItems items={signatureItems} showAllButton />
              <About />
              <Footer ref={footerRef} />
            </>
          }
        />
        <Route path="/all-items" element={<AllItemsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
