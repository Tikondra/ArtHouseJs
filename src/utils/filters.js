import {getFurnitureParameters, sortingParametersChair, sortingParametersFurniture} from "./offers";
import {getChecked} from "./utils";

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

export const getFiltersByFurniture = (offers) => {
  const countries = [];
  const vendors = [];
  const frameMaterials = [];
  const frameColors = [];

  const allFilters = [
    {
      type: `country`,
      title: `Страна`,
      items: countries
    },
    {
      type: `vendor`,
      title: `Производитель`,
      items: vendors
    },
    {
      type: `frameMaterial`,
      title: `Материал каркаса`,
      items: frameMaterials
    },
    {
      type: `frameColor`,
      title: `Цвет каркаса`,
      items: frameColors
    },
  ];

  offers.map((offer) => {

    if (!countries.includes(offer.country) && offer.country) {
      countries.push(offer.country);
    } else if (!vendors.includes(offer.vendor) && offer.vendor) {
      vendors.push(offer.vendor);
    } else if (!frameMaterials.includes(offer.frameMaterial) && offer.frameMaterial) {
      frameMaterials.push(offer.frameMaterial);
    } else if (!frameColors.includes(offer.frameColor) && offer.frameColor) {
      frameColors.push(offer.frameColor);
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

export const getSortedOffersByFurniture = (offers) => {
  const container = document.querySelector(`.filter__box`);

  const checkedByCountry = getChecked(container, `country`);
  const checkedByVendor = getChecked(container, `vendor`);
  const checkedByFrameMaterial = getChecked(container, `frameMaterial`);
  const checkedByFrameColor = getChecked(container, `frameColor`);

  const checked = [
    ...checkedByVendor,
    ...checkedByCountry,
    ...checkedByFrameMaterial,
    ...checkedByFrameColor
  ];

  let sortedOffers = offers;

  if (checked.length > 0) {
    sortedOffers = offers.filter((offer) => {
      if (checkedByCountry.length === 0) {
        return true;
      }
      return checkedByCountry.includes(offer.country);
    }).filter((offer) => {
      if (checkedByVendor.length === 0) {
        return true;
      }
      return checkedByVendor.includes(offer.vendor);
    }).filter((it) => {
      if (checkedByFrameMaterial.length === 0) {
        return true;
      }
      return checkedByFrameMaterial.includes(it.frameMaterial);
    }).filter((it) => {
      if (checkedByFrameColor.length === 0) {
        return true;
      }
      return checkedByFrameColor.includes(it.frameColor);
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
