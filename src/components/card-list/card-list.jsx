import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";

const getOfferCard = (offers) => offers.map((offer) => {
  return (
    <Card
      key = {offer.id}
      offer = {offer}
    />
  );
});

const CardList = ({offers, showingOffersCount}) => {
  const showingOffers = offers.slice(0, showingOffersCount);

  return (
    <ul className="cards">
      {getOfferCard(showingOffers)}
    </ul>
  );
};

CardList.propTypes = {
  offers: PropTypes.array.isRequired,
  showingOffersCount: PropTypes.number.isRequired,
};

export default CardList;
