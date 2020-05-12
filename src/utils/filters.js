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
  const styles = [];
  const setups = [];
  const colors = [];

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
    },
    {
      type: `style`,
      title: `Стиль`,
      items: styles
    },
    {
      type: `color`,
      title: `Цвет`,
      items: colors
    },
    {
      type: `setup`,
      title: `Место установки`,
      items: setups
    },
  ];

  parameters.map((parameter) => {

    if (!vendors.includes(parameter.parameters.current.brend) && parameter.parameters.current.brend) {
      vendors.push(parameter.parameters.current.brend);
    } else if (!countries.includes(parameter.parameters.current.country) && parameter.parameters.current.country) {
      countries.push(parameter.parameters.current.country);
    } else if (!styles.includes(parameter.parameters.current.style) && parameter.parameters.current.style) {
      styles.push(parameter.parameters.current.style);
    } else if (!colors.includes(parameter.parameters.current.color) && parameter.parameters.current.color) {
      colors.push(parameter.parameters.current.color);
    } else if (!setups.includes(parameter.parameters.current.setup) && parameter.parameters.current.setup) {
      setups.push(parameter.parameters.current.setup);
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
