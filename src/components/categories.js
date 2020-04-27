const getParentId = (id) => id ? id : ``;

export const getCategory = (data) => {

  return data.reduce((categoriesList, card) => {
    const category = {
      title: card._text,
      id: card._attributes.id,
      parentId: getParentId(card._attributes.parentId)
    };
    categoriesList.push(category);
    return categoriesList;
  }, []);
};
