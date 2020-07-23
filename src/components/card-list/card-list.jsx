import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card";

const getOfferCard = (offers) => offers.map((offer) => {
  return (
    <Card
      key = {offer.id}
      offer = {offer}
    />
  );
});

const CardList = ({offers}) => {
  return (
    <ul className="cards">
      {getOfferCard(offers)}
    </ul>
  );
};

CardList.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default CardList;
