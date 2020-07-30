import {getPercent, delLastItem} from "./utils";
import {getParametersLight} from "./parameters-light";

const isTrue = (it) => it ? it : ``;

const clearImg = (images) => images.filter((it) => it.endsWith(`jpg`) || it.endsWith(`JPG`) || it.endsWith(`jpeg`));

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
      href: `card?${offer.id}`
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
  const image = clearImg(offer.image.split(`;`));
  const id = offer.id_tovar;

  return ({
    title: offer.name,
    price: offer.price,
    image,
    categoryId: offer.categoryId,
    id,
    vendor: offer.vendor,
    parameters,
    href: `card-light?${id}`
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

export const parseFiltersLight = (filters) => filters.map((filter) => {
  const filterValues = filter.values_of_name.split(`:`);

  return ({
    type: filter.id,
    title: filter.name,
    items: filterValues
  });
});

