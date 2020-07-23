import React from "react";

const Sort = () => {
  return (
    <div className="store-content__sort">
      <h2>Сортировка:</h2>
      <select className="store-content__sort-select"
      >
        <option value="default">По популярности
        </option
        >
        <option value="price-up">По возрастанию цены
        </option
        >
        <option value="price-down">По убыванию цены</option>
      </select
      >
    </div>
  );
};

export default Sort;
