import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getOffers} from "../../reducer/selectors";
import Filter from "../filter/filter";
import Catalog from "../catalog/catalog";

const App = ({offers}) => {
  return (
    <div className="store-content">
      <Filter/>
      <Catalog
        offers = {offers}
      />
    </div>
  );
};

App.propTypes = {
  offers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
});

export {App};
export default connect(mapStateToProps)(App);
