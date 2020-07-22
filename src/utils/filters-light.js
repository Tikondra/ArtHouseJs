import {getChecked} from "./utils";

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

export const getSortedOffersByLight = (container, offers) => {
  const checkedByBrand = getChecked(container, `brand`);
  const checkedByCountry = getChecked(container, `country`);
  const checkedByStyle = getChecked(container, `style`);
  const checkedByColor = getChecked(container, `color`);
  const checkedBySetup = getChecked(container, `setup`);
  const checked = [...checkedByBrand, ...checkedByCountry, ...checkedByStyle, ...checkedByColor, ...checkedBySetup];

  let sortedOffers = offers;

  if (checked.length > 0) {
    sortedOffers = offers.filter((it) => {
      if (checkedByBrand.length === 0) {
        return true;
      }
      return checkedByBrand.includes(it.parameters.current.brend);
    }).filter((it) => {
      if (checkedByCountry.length === 0) {
        return true;
      }
      return checkedByCountry.includes(it.parameters.current.country);
    }).filter((it) => {
      if (checkedByStyle.length === 0) {
        return true;
      }
      return checkedByStyle.includes(it.parameters.current.style);
    }).filter((it) => {
      if (checkedByColor.length === 0) {
        return true;
      }
      return checkedByColor.includes(it.parameters.current.color);
    }).filter((it) => {
      if (checkedBySetup.length === 0) {
        return true;
      }
      return checkedBySetup.includes(it.parameters.current.setup);
    });
  }

  return sortedOffers;
};
