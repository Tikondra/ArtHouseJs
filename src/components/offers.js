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

const sortingParameters = (parameters) => {
  const a = {};
  const b = [];
  const c = [];

  parameters.map((parameter) => {
    if (parameter._attributes.name === `Старая цена`) {
      a.oldPrice = parameter._text;
    } else if (parameter._attributes.name === `Бренд`) {
      a.brend = parameter._text;
    } else if (parameter._attributes.name === `Страна`) {
      a.country = parameter._text;
    } else if (parameter._attributes.name === `Остаток поставщика`) {
      c.push(parameter);
    } else if (parameter._attributes.name === `Автоматическая сортировка`) {
      c.push(parameter);
    } else if (parameter._attributes.name === `Акция`) {
      c.push(parameter);
    } else if (parameter._attributes.name === `Раздел на сайте`) {
      c.push(parameter);
    } else if (parameter._attributes.name === `Дата обновления изображений`) {
      c.push(parameter);
    } else if (parameter._attributes.name === `Срок окончания акции`) {
      c.push(parameter);
    } else {
      b.push(parameter);
    }
  });
  return [a, b, c];
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
