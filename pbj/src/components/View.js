import React from 'react';
import PropTypes from 'prop-types';

import Total from './Total';
import Selector from './Selector';

export default class View extends React.Component {
  constructor(props) {
    super(props);

    // Initialize values to the first option
    const category = Object.keys(props.prices)[0];
    const item = Object.keys(props.prices[category])[0];
    const deliveryMethod = Object.keys(props.prices[category][item])[0];

    this.state = {
      category,
      item,
      deliveryMethod
    };
  }

  categoryOptions() {
    return Object.keys(this.props.prices);
  }

  itemOptions() {
    return Object.keys(this.props.prices[this.state.category]);
  }

  deliveryMethodOptions() {
    return Object.keys(this.props.prices[this.state.category][this.state.item]);
  }

  getPriceList() {
    return this.props.prices[this.state.category][this.state.item][this.state.deliveryMethod];
  }

  /**
   * Update state with the new category.
   * @param  {Object} e DOM event
   * @return {undefined}
   */
  handleCategoryChange(e) {
    if (this.state.category !== e.target.value) {
      this.setState({
        category: e.target.value,
        item: Object.keys(this.props.prices[e.target.value])[0]
      });
    }
  }

  /**
   * Update state with the new item.
   * @param  {Object} e DOM event
   * @return {undefined}
   */
  handleItemChange(e) {
    this.setState({
      item: e.target.value
    });
  }

  /**
   * Update state with the new delivery method.
   * @param  {Object} e DOM event
   * @return {undefined}
   */
  handleDeliveryMethodChange(e) {
    this.setState({ deliveryMethod: e.target.value });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="bg-inverse text-white mb-2">
          <h4 className="text-center">
            <abbr title={this.props.version} style={{ textDecoration: 'none' }}>Peanut Butter & Jellyvision Sandwich Shoppe</abbr>
          </h4>
          <div className="row no-gutters justify-content-center">
            <Selector
              label="Category"
              name="category"
              options={this.categoryOptions()}
              selected={this.state.category}
              onChange={event => this.handleCategoryChange(event)}
            />
            <Selector
              label="Item"
              name="item"
              options={this.itemOptions()}
              selected={this.state.item}
              onChange={event => this.handleItemChange(event)}
            />
            <Selector
              label="Delivery Method"
              name="deliveryMethod"
              options={this.deliveryMethodOptions()}
              selected={this.state.deliveryMethod}
              onChange={event => this.handleDeliveryMethodChange(event)}
            />
          </div>
        </div>
        <div className="col">
          <Total
            options={this.props.options}
            costs={this.getPriceList()}
          />
        </div>
      </div>
    );
  }
}

View.propTypes = {
  options: PropTypes.object.isRequired,
  prices: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
};
