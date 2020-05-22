import {
  getFurnitureParameters,
  sortingParameters,
  sortingParametersChair,
  sortingParametersFurniture
} from "../components/offers";

export const getParameters = (data) => {
  return data.reduce((filterList, card) => {
    const product = {
      parameters: sortingParameters(card.param)
    };
    filterList.push(product);
    return filterList;
  }, []);
};

export const getParametersForFurniture = (data, parametersMap) => {

  return data.reduce((filterList, card) => {
    const allParameters = getFurnitureParameters(card.ЗначенияСвойств.ЗначенияСвойства, parametersMap);
    const product = {
      parameters: sortingParametersFurniture(allParameters)
    };
    filterList.push(product);
    return filterList;
  }, []);
};

export const getParametersForChair = (data, parametersMap) => {

  return data.reduce((filterList, card) => {
    const allParameters = getFurnitureParameters(card.ЗначенияСвойств.ЗначенияСвойства, parametersMap);
    const product = {
      parameters: sortingParametersChair(allParameters)
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

export const getFiltersByFurniture = (parameters) => {
  const countries = [];
  const styles = [];
  const materials = [];
  const materialsUp = [];
  const sizes = [];
  const rooms = [];
  const types = [];
  const forms = [];

  const allFilters = [
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
      type: `materialKarkas`,
      title: `Материал каркаса`,
      items: materials
    },
    {
      type: `materialUp`,
      title: `Материал столешницы`,
      items: materialsUp
    },
    {
      type: `size`,
      title: `Размер`,
      items: sizes
    },
    {
      type: `rooms`,
      title: `В какую комнату`,
      items: rooms
    },
    {
      type: `form`,
      title: `Форма`,
      items: forms
    },
    {
      type: `type`,
      title: `По раскладке`,
      items: types
    },
  ];

  parameters.map((parameter) => {

    if (!countries.includes(parameter.parameters.current.country) && parameter.parameters.current.country) {
      countries.push(parameter.parameters.current.country);
    } else if (!styles.includes(parameter.parameters.current.style) && parameter.parameters.current.style) {
      styles.push(parameter.parameters.current.style);
    } else if (!materials.includes(parameter.parameters.current.materialKarkas) && parameter.parameters.current.materialKarkas) {
      materials.push(parameter.parameters.current.materialKarkas);
    } else if (!materialsUp.includes(parameter.parameters.current.materialUp) && parameter.parameters.current.materialUp) {
      materialsUp.push(parameter.parameters.current.materialUp);
    } else if (!sizes.includes(parameter.parameters.current.size) && parameter.parameters.current.size) {
      sizes.push(parameter.parameters.current.size);
    } else if (!rooms.includes(parameter.parameters.current.room) && parameter.parameters.current.room) {
      rooms.push(parameter.parameters.current.room);
    } else if (!forms.includes(parameter.parameters.current.form) && parameter.parameters.current.form) {
      forms.push(parameter.parameters.current.form);
    } else if (!types.includes(parameter.parameters.current.type) && parameter.parameters.current.type) {
      types.push(parameter.parameters.current.type);
    }
  });

  return allFilters;
};

export const getFiltersByChair = (parameters) => {
  const countries = [];
  const materialsBase = [];
  const materialsUp = [];
  const rooms = [];
  const styles = [];
  const typesUp = [];

  const allFilters = [
    {
      type: `country`,
      title: `Страна`,
      items: countries
    },
    {
      type: `materialBase`,
      title: `Материал каркаса`,
      items: materialsBase
    },
    {
      type: `materialUp`,
      title: `Материал сиденья`,
      items: materialsUp
    },
    {
      type: `rooms`,
      title: `В какую комнату`,
      items: rooms
    },
    {
      type: `style`,
      title: `Стиль`,
      items: styles
    },
    {
      type: `typeUp`,
      title: `Тип сиденья`,
      items: typesUp
    },
  ];

  parameters.map((parameter) => {

    if (!countries.includes(parameter.parameters.current.country) && parameter.parameters.current.country) {
      countries.push(parameter.parameters.current.country);
    } else if (!materialsBase.includes(parameter.parameters.current.materialBase) && parameter.parameters.current.materialBase) {
      materialsBase.push(parameter.parameters.current.materialBase);
    } else if (!materialsUp.includes(parameter.parameters.current.materialUp) && parameter.parameters.current.materialUp) {
      materialsUp.push(parameter.parameters.current.materialUp);
    } else if (!rooms.includes(parameter.parameters.current.room) && parameter.parameters.current.room) {
      rooms.push(parameter.parameters.current.room);
    } else if (!styles.includes(parameter.parameters.current.style) && parameter.parameters.current.style) {
      styles.push(parameter.parameters.current.style);
    } else if (!typesUp.includes(parameter.parameters.current.typeUp) && parameter.parameters.current.typeUp) {
      typesUp.push(parameter.parameters.current.typeUp);
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

export const getSortedOffersByFurniture = (container, offers) => {
  const checkedByCountry = getChecked(container, `country`);
  const checkedByStyle = getChecked(container, `style`);
  const checkedByMaterialBase = getChecked(container, `materialKarkas`);
  const checkedByMaterialUp = getChecked(container, `materialUp`);
  const checkedBySize = getChecked(container, `size`);
  const checkedByRoom = getChecked(container, `rooms`);
  const checkedByForm = getChecked(container, `form`);
  const checkedByType = getChecked(container, `type`);

  const checked = [
    ...checkedByCountry,
    ...checkedByStyle,
    ...checkedByMaterialBase,
    ...checkedByMaterialUp,
    ...checkedBySize,
    ...checkedByRoom,
    ...checkedByForm,
    ...checkedByType,
  ];

  let sortedOffers = offers;

  if (checked.length > 0) {
    sortedOffers = offers.filter((it) => {
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
      if (checkedByMaterialBase.length === 0) {
        return true;
      }
      return checkedByMaterialBase.includes(it.parameters.current.materialKarkas);
    }).filter((it) => {
      if (checkedByMaterialUp.length === 0) {
        return true;
      }
      return checkedByMaterialUp.includes(it.parameters.current.materialUp);
    }).filter((it) => {
      if (checkedBySize.length === 0) {
        return true;
      }
      return checkedBySize.includes(it.parameters.current.size);
    }).filter((it) => {
      if (checkedByRoom.length === 0) {
        return true;
      }
      return checkedByRoom.includes(it.parameters.current.room);
    }).filter((it) => {
      if (checkedByForm.length === 0) {
        return true;
      }
      return checkedByForm.includes(it.parameters.current.form);
    }).filter((it) => {
      if (checkedByType.length === 0) {
        return true;
      }
      return checkedByType.includes(it.parameters.current.type);
    });
  }

  return sortedOffers;
};

export const getSortedOffersByChair = (container, offers) => {
  const checkedByCountry = getChecked(container, `country`);
  const checkedByMaterialBase = getChecked(container, `materialBase`);
  const checkedByMaterialUp = getChecked(container, `materialUp`);
  const checkedByRoom = getChecked(container, `rooms`);
  const checkedByStyle = getChecked(container, `style`);
  const checkedByType = getChecked(container, `typeUp`);

  const checked = [
    ...checkedByCountry,
    ...checkedByStyle,
    ...checkedByMaterialBase,
    ...checkedByMaterialUp,
    ...checkedByRoom,
    ...checkedByType,
  ];
  console.log(offers)
  let sortedOffers = offers;

  if (checked.length > 0) {
    sortedOffers = offers.filter((it) => {
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
      if (checkedByMaterialBase.length === 0) {
        return true;
      }
      return checkedByMaterialBase.includes(it.parameters.current.materialBase);
    }).filter((it) => {
      if (checkedByMaterialUp.length === 0) {
        return true;
      }
      return checkedByMaterialUp.includes(it.parameters.current.materialUp);
    }).filter((it) => {
      if (checkedByRoom.length === 0) {
        return true;
      }
      return checkedByRoom.includes(it.parameters.current.room);
    }).filter((it) => {
      if (checkedByType.length === 0) {
        return true;
      }
      return checkedByType.includes(it.parameters.current.typeUp);
    });
  }

  return sortedOffers;
};
