import {getPercent, delLastItem} from "./utils";
import {getParametersLight} from "./parameters-light";

const isTrue = (it) => it ? it : ``;

const clearImg = (images) => images.filter((it) => it.endsWith(`jpg`) || it.endsWith(`JPG`));

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
      article: isTrue(offer.articule),
      shop: offer.shop,
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

export const parseDataLight = (offers) => offers.map((offer) => {
  const parameters = getParametersLight(offer.param);

  return ({
    title: offer.name,
    price: offer.price,
    image: offer.image,
    categoryId: offer.categoryId,
    id: offer.id,
    vendor: offer.vendor,
    parameters,
  });
});

export const parseCategoriesLight = (categories) => {
  return categories.reduce((categoriesList, category) => {
    const cat = {
      title: category.title,
      id: category.category_id,
      parentId: category.parent_id,
    };

    categoriesList.push(cat);
    return categoriesList;
  }, []);
}; // Категории Свет
