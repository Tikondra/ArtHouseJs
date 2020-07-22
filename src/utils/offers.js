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
    } else if (parameter.title === `Размер`) {
      current.size = parameter.value;
    } else if (parameter.title === `Форма`) {
      current.form = parameter.value;
    } else if (parameter.title === `По раскладке`) {
      current.type = parameter.value;
    } else if (parameter.title === `В какую комнату`) {
      current.room = parameter.value;
    } else if (parameter.title === `Цвет каркаса`) {
      current.colorBase = parameter.value;
    } else if (parameter.title === `Цвет столешницы`) {
      current.colorUp = parameter.value;
    } else if (parameter.title === `Срок службы`) {
      service.push(parameter);
    } else if (parameter.title === `Гарантия`) {
      service.push(parameter);
    } else {
      rest.push(parameter);
    }
  });
  return allParameters;
};

export const sortingParametersChair = (parameters) => {
  const current = {};
  const rest = [];
  const service = [];
  const allParameters = {
    service,
    current,
    rest,
  };

  parameters.map((parameter) => {
    if (parameter.title === `Производитель`) {
      current.brand = parameter.value;
    } else if (parameter.title === `Страна происхождения`) {
      current.country = parameter.value;
    } else if (parameter.title === `Материал каркаса`) {
      current.materialBase = parameter.value;
    } else if (parameter.title === `Материал сиденья`) {
      current.materialUp = parameter.value;
    } else if (parameter.title === `Цвет сиденья`) {
      current.colorUp = parameter.value;
    } else if (parameter.title === `Цвет каркаса`) {
      current.colorBase = parameter.value;
    } else if (parameter.title === `В какую комнату`) {
      current.room = parameter.value;
    } else if (parameter.title === `Розничная цена со скидкой `) {
      current.price = parameter.value;
    } else if (parameter.title === `Стиль`) {
      current.style = parameter.value;
    } else if (parameter.title === `Мягкое / жесткое сиденье`) {
      current.typeUp = parameter.value;
    } else if (parameter.title === `Срок службы`) {
      service.push(parameter);
    } else if (parameter.title === `Гарантия`) {
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

export const getOffersFurniture = (data, parametersMap, type) => {
  const toSortingMap = {
    furniture: sortingParametersFurniture,
    chairs: sortingParametersChair,
  };

  return data.reduce((cardList, card) => {
    const allParameters = getFurnitureParameters(card.ЗначенияСвойств.ЗначенияСвойства, parametersMap);
    const img = [card.Картинка._text];
    const parameters = toSortingMap[type](allParameters);

    const product = {
      id: card.Ид._text,
      title: card.Наименование._text,
      image: img,
      description: card.Описание._text,
      parameters,
      price: parameters.current.price,
    };
    cardList.push(product);
    return cardList;
  }, []);
};
