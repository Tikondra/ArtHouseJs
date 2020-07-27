import React from "react";
import Filter from "../filter/filter.jsx";
import Catalog from "../catalog/catalog.jsx";

const App = () => {
  return (
    <div className="store-content">
      <Filter/>
      <Catalog/>
    </div>
  );
};

export default App;
