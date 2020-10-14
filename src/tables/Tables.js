import React, {Fragment} from "react";
import Filter from "./components/Filter";
import Catalog from "./components/Catalog";

const Tables = () => {
  return (
    <Fragment>
      <Filter/>
      <Catalog/>
    </Fragment>
  );
};

export default Tables;
