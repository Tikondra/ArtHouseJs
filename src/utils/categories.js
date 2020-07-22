export const getFurnitureParameters = (data) => {
  const parametersList = {};

  data.forEach((card) => {
    const key = card.Ид._text;
    parametersList[key] = card.Наименование._text;
  });

  return parametersList;
};
