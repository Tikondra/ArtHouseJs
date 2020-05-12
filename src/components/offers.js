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

const getSale = (sale) => sale ? sale._text : ``;

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

export const getOffers = (data) => {
  return data.reduce((cardList, card) => {
    const product = {
      title: card.name._text,
      price: card.price._text,
      sale: getSale(card.wholesalePrice),
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
