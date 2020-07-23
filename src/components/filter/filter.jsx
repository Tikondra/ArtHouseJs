import React, {Fragment} from "react";

const Filter = (props) => {
  return (
    <Fragment>
      <button className="filter__open" type="button">Фильтр</button>
      <section className="filter">
        <form className="filter__form" action="" method="">
          <h2 className="filter__main-title">Фильтр</h2>
          <nav className="sort">
            <ul className="sort__list sort__list--category">
              <!-- категории -->
            </ul>
            <a className="sort__category-view" href="decor.html"
            >Показать все категории</a
            >
          </nav>
          <div className="filter__box"><!-- фильтры --></div>
          <div className="filter__btn-box">
            <button className="filter__btn" type="submit">Показать</button>
            <button className="filter__btn filter__btn--reset" type="reset">
              Очистить
            </button>
          </div>
          <button className="filter__btn-close" type="button">Х</button>
        </form>
      </section>
    </Fragment>
  )
}

export default Filter;
