import {getPercent} from "./utils";

const isTrue = (it) => it ? it : ``;

const delLastItem = (arr) => {
  arr.splice(arr.length - 1);
  return arr;
};

const clearImg = (images) => images.filter((it) => it.endsWith(`jpg`));

export const parseData = (offers) => {
  return offers.reduce((cardList, offer) => {
    const price = offer.price;
    const sale = Math.floor(getPercent(price, 20));
    const image = clearImg(offer.picture.split(`;`));
    const categoryId = delLastItem(offer.cat.split(`;`));

    const product = {
      title: offer.title,
      price,
      sale,
      image,
      categoryId,
      id: offer.id,
      material: isTrue(offer.material),
      article: isTrue(offer.articule)
    };
    cardList.push(product);
    return cardList;
  }, []);
}; // Декор

export const parseCategories = (categories) => {
  return categories.reduce((categoriesList, category) => {
    const cat = {
      title: category.title,
      id: category.self_id,
      parentId: category.parent_id,
    };

    categoriesList.push(cat);
    return categoriesList;
  }, []);
}; // Категории Декор
