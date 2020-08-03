import React from "react";
import PropTypes from "prop-types";

class Sort extends React.PureComponent {
  constructor(props) {
    super(props);

    this.sortRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {activeCategory, activeFilter, onChangeSortType} = this.props;

    onChangeSortType(activeCategory, activeFilter, this.sortRef.current.value);
  }

  render() {
    return (
      <div className="store-content__sort">
        <h2>Сортировка:</h2>
        <select
          className="store-content__sort-select"
          onChange={this.handleSubmit}
          ref={this.sortRef}
        >
          <option value="">По популярности</option>
          <option value="ASC">По возрастанию цены</option>
          <option value="DESC">По убыванию цены</option>
        </select>
      </div>
    );
  }
}

Sort.propTypes = {
  activeCategory: PropTypes.string,
  activeFilter: PropTypes.array,
  onChangeSortType: PropTypes.func.isRequired,
};

export default Sort;
