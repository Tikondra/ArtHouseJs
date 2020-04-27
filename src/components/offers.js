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
