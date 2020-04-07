import {card} from "./components/card";

import {EVENT_COUNT, Place} from "./components/consts";

import {cleanContainer, render, renderCard} from "./components/utils";

const cardBox = document.querySelector(`.cards`);

renderCard(cardBox, card(), EVENT_COUNT);
