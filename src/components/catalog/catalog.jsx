import React from "react";
import PropTypes from "prop-types";
import Sort from "../sort/sort";
import CardList from "../card-list/card-list";

const Catalog = ({offers}) => {
  return (
    <section className="store-content__cards light-js">
      <h1 className="store-content__title visually-hidden">Свет</h1>
      <Sort/>
      <CardList
        offers = {offers}
      />
      <div className="store-content__more-box">
        <button className="store-content__btn-more" type="button">
          Показать еще
        </button>
      </div>
    </section>
  );
};

Catalog.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default Catalog;
