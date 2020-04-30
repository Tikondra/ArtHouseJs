export const getSomeCategory = (category, categories) => {

  return categories.filter((it) => {
    return it.parentId === category.id;
  }).reduce((catList, cat) => {
    catList.push(cat.id);
    return catList;
  }, []);
};

export const getSomeCards = (category, categories, offers) => {

  const someCategory = getSomeCategory(category, categories);

  // сравнение двух массивов
  const getTrue = (card) => card.categoryId.some((n) => someCategory.includes(n));

  return offers.filter((card) => {
    if (typeof card.categoryId === `string`) {
      return card.categoryId === category.id || someCategory.includes(card.categoryId);
    } else {
      return getTrue(card);
    }
  });
};
