import {delLastItem} from "./utils";

const getParameters = (parameters) => parameters.map((it) => {
  const item = it.split(` — `);
  return {
    name: item[1],
    value: item[0],
  };
});

const sortingParameters = (parameters) => {
  const current = {};
  const rest = [];
  const service = [];
  const allParameters = {
    service,
    current,
    rest,
  };

  parameters.map((parameter) => {
    if (parameter.name === `Старая цена`) {
      current.oldPrice = parameter.value;
    } else if (parameter.name === `Бренд`) {
      current.brend = parameter.value;
    } else if (parameter.name === `Страна`) {
      current.country = parameter.value;
    } else if (parameter.name === `Стиль`) {
      current.style = parameter.value;
    } else if (parameter.name === `Место установки`) {
      current.setup = parameter.value;
    } else if (parameter.name === `Цвет`) {
      current.color = parameter.value;
    } else if (parameter.name === `Остаток поставщика`) {
      service.push(parameter);
    } else if (parameter.name === `Автоматическая сортировка`) {
      service.push(parameter);
    } else if (parameter.name === `Акция`) {
      service.push(parameter);
    } else if (parameter.name === `Раздел на сайте`) {
      service.push(parameter);
    } else if (parameter.name === `Дата обновления изображений`) {
      service.push(parameter);
    } else if (parameter.name === `Срок окончания акции`) {
      service.push(parameter);
    } else if (parameter.name === `ШтрихКод`) {
      service.push(parameter);
    } else {
      rest.push(parameter);
    }
  });
  return allParameters;
};

export const getParametersLight = (param) => {
  const parametersArr = delLastItem(param.split(`;`));
  const parametersObj = getParameters(parametersArr);

  return sortingParameters(parametersObj);
};

export const getOnlyParameters = (offers) => offers.map((offer) => {
  return {
    parameters: offer.parameters,
  };
});
