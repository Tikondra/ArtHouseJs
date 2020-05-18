import {getPercent, makeCounter} from "./utils";

const getImage = (img) => {
  if (img._text) {
    return [img._text];
  } else {
    const selectImg = img.filter((it) => it._text.endsWith(`jpg`));
    return selectImg.reduce((imgList, it) => {
      imgList.push(it._text);
      return imgList;
    }, []);
  }
};

const getCategoryId = (category) => {
  if (category._text) {
    return category._text;
  } else {
    return category.reduce((categoryId, it) => {
      categoryId.push(it._text);
      return categoryId;
    }, []);
  }
};

const isTrue = (it) => it ? it : ``;

const getId = makeCounter();

export const sortingParameters = (parameters) => {
  const current = {};
  const rest = [];
  const service = [];
  const allParameters = {
    service,
    current,
    rest,
  };

  parameters.map((parameter) => {
    if (parameter._attributes.name === `Старая цена`) {
      current.oldPrice = parameter._text;
    } else if (parameter._attributes.name === `Бренд`) {
      current.brend = parameter._text;
    } else if (parameter._attributes.name === `Страна`) {
      current.country = parameter._text;
    } else if (parameter._attributes.name === `Стиль`) {
      current.style = parameter._text;
    } else if (parameter._attributes.name === `Место установки`) {
      current.setup = parameter._text;
    } else if (parameter._attributes.name === `Цвет`) {
      current.color = parameter._text;
    } else if (parameter._attributes.name === `Остаток поставщика`) {
      service.push(parameter);
    } else if (parameter._attributes.name === `Автоматическая сортировка`) {
      service.push(parameter);
    } else if (parameter._attributes.name === `Акция`) {
      service.push(parameter);
    } else if (parameter._attributes.name === `Раздел на сайте`) {
      service.push(parameter);
    } else if (parameter._attributes.name === `Дата обновления изображений`) {
      service.push(parameter);
    } else if (parameter._attributes.name === `Срок окончания акции`) {
      service.push(parameter);
    } else if (parameter._attributes.name === `ШтрихКод`) {
      service.push(parameter);
    } else {
      rest.push(parameter);
    }
  });
  return allParameters;
};

export const sortingParametersFurniture = (parameters) => {
  const current = {};
  const rest = [];
  const service = [];
  const allParameters = {
    service,
    current,
    rest,
  };

  parameters.map((parameter) => {
    if (parameter.title === `Материал каркаса`) {
      current.materialKarkas = parameter.value;
    } else if (parameter.title === `Розничная цена со скидкой `) {
      current.price = parameter.value;
    } else if (parameter.title === `Материал столешницы`) {
      current.materialUp = parameter.value;
    } else if (parameter.title === `Производитель`) {
      current.brand = parameter.value;
    } else if (parameter.title === `Страна происхождения`) {
      current.country = parameter.value;
    } else if (parameter.title === `Стиль`) {
      current.style = parameter.value;
    } else if (parameter.title === `Цвет`) {
      current.color = parameter.value;
    } else if (parameter.title === `Цвет каркаса`) {
      service.push(parameter);
    } else if (parameter.title === `Размер`) {
      service.push(parameter);
    } else if (parameter.title === `В какую комнату`) {
      service.push(parameter);
    } else if (parameter.title === `Цвет столешницы`) {
      service.push(parameter);
    } else if (parameter.title === `Форма`) {
      service.push(parameter);
    } else if (parameter.title === `По раскладке`) {
      service.push(parameter);
    } else if (parameter.title === `Срок службы`) {
      service.push(parameter);
    } else if (parameter.title === `Гарантия`) {
      service.push(parameter);
    } else if (parameter.title === `Материал`) {
      service.push(parameter);
    } else {
      rest.push(parameter);
    }
  });
  return allParameters;
};

const getClearParameter = (parameters) => {
  const parametersList = [];
  parameters.map((it) => {
    if (it.Значение._text) {
      parametersList.push(it);
    }
  });

  return parametersList;
};

export const getFurnitureParameters = (parameters, parametersMap) => {
  const someParameters = getClearParameter(parameters);

  return someParameters.reduce((parametersList, parameter) => {

    const data = {
      title: parametersMap[parameter.Ид._text],
      value: parameter.Значение._text,
    };

    parametersList.push(data);
    return parametersList;
  }, []);
};

export const getOffers = (data) => {

  return data.reduce((cardList, card) => {
    const price = card.price._text;
    const sale = Math.floor(getPercent(price, 20));

    const product = {
      title: card.name._text,
      price,
      sale,
      image: getImage(card.picture),
      categoryId: getCategoryId(card.categoryId),
      id: card._attributes.id,
      material: isTrue(card.material._text),
      article: isTrue(card.vendorCode._text)
    };
    cardList.push(product);
    return cardList;
  }, []);
};

export const getOffersLight = (data) => {

  return data.reduce((cardList, card) => {
    const product = {
      title: card.name._text,
      activePrice: card.price._text,
      image: getImage(card.picture),
      categoryId: getCategoryId(card.categoryId),
      id: card._attributes.id,
      available: card._attributes.available,
      parameters: sortingParameters(card.param)
    };
    cardList.push(product);
    return cardList;
  }, []);
};

export const getOffersFurniture = (data, parametersMap) => {
  return data.reduce((cardList, card) => {
    const allParameters = getFurnitureParameters(card.ЗначенияСвойств.ЗначенияСвойства, parametersMap);

    const product = {
      id: getId() + 1,
      title: card.Наименование._text,
      image: card.Картинка._text,
      description: card.Описание._text,
      parameters: sortingParametersFurniture(allParameters),
    };
    cardList.push(product);
    return cardList;
  }, []);
};
