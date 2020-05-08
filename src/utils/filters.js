import {sortingParameters} from "../components/offers";

export const getParameters = (data) => {
  return data.reduce((filterList, card) => {
    const product = {
      parameters: sortingParameters(card.param)
    };
    filterList.push(product);
    return filterList;
  }, []);
};

export const getFilters = (parameters) => {
  const vendors = [];
  const countries = [];

  const allFilters = [
    {
      type: `brand`,
      title: `Бренд`,
      items: vendors
    },
    {
      type: `country`,
      title: `Страна`,
      items: countries
    }
  ];

  parameters.map((parameter) => {

    if (!vendors.includes(parameter.parameters.current.brend) && parameter.parameters.current.brend) {
      vendors.push(parameter.parameters.current.brend);
    } else if (!countries.includes(parameter.parameters.current.country) && parameter.parameters.current.country) {
      countries.push(parameter.parameters.current.country);
    }
  });

  return allFilters;
};

export const getChecked = (container, type) => {
  const checked = [...container.querySelectorAll(`[data-type="${type}"] input[type="checkbox"]:checked`)];
  return checked.reduce((checkedList, it) => {
    checkedList.push(it.value);
    return checkedList;
  }, []);
};
