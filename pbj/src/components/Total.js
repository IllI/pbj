import React from 'react';
import PropTypes from 'prop-types';

import Subtotal from './Subtotal';
import Toggle from './Toggle';

class Total extends React.Component {
  constructor(props) {
    super(props);
    console.log('total', props);
    // Initialize all values to 0
    const initialValues = Object.keys(props.options).reduce((obj, key) => {
      if (key==="basePrice"){
            obj[key]=1;
        } else{
            obj[key] = 0;
        }
      return obj;
    }, {});

    this.state = {
      fieldValues: initialValues
    };
  }

  /**
   * Sum up all the prices for selected options
   * @return {Number} The sandwich total
   */
  calculateTotal() {
    let total = 0;
    let addOnCosts = 0;

    Object.keys(this.props.options).forEach(key => {
      if (this.state.fieldValues[key]) {
        const cost = this.props.costs[key] || 0;
        const fieldValue = this.state.fieldValues[key] || 1;
        const option = this.props.options[key];
        const type = option.type;
        switch (type) {
          case 'basePrice':
            total+= cost;
            addOnCosts = total;

            break;
          case 'subtotal':
            total += cost * fieldValue;
            addOnCosts = total;
            break;
          case 'toggle':
            if (fieldValue) {
              total += cost;
              addOnCosts = total;
            }
            break;
          case 'multiplier':
            if (fieldValue) {
              total = addOnCosts * cost;
            }
            break;
        }
      }
    });

    return this.formatAsCurrency(total);
  }

  /**
   * Turn a number into a string formatted in dollars
   * @param  {Number} cost The price to format
   * @return {String}      The formatted price
   */
  formatAsCurrency(cost) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });

    return formatter.format(cost);
  }

  /**
   * Update the value for the given sandwich option
   * @param  {Object} e   Event from DOM
   * @param  {String} key Option to update
   * @return {undefined}
   */
  handleCountChange(e, key) {
    const nextFieldValues = Object.assign({}, this.state.fieldValues, { [key]: parseFloat(e.target.value) });
    this.setState({ fieldValues: nextFieldValues });
  }

  /**
   * Update the value for the given sandwich option
   * @param  {Object} e   Event from DOM
   * @param  {String} key Option to update
   * @return {undefined}
   */
  handleToggleChange(e, key) {


    const nextFieldValues = Object.assign({}, this.state.fieldValues, { [key]: e.target.checked });
    if (key === 'large'){
        nextFieldValues['small'] = 0;
    } else if (key === 'small'){
        nextFieldValues['large'] = 0;
    }
    this.setState({ fieldValues: nextFieldValues });

  }

  render() {
    return (
      <div className="row Total">
        <div className="col-sm">
          {
            Object.keys(this.props.options)
              .filter(key => this.props.options[key].type === 'subtotal')
              .map((key, index) => {
                const cost = this.props.costs[key];

                if (cost) {
                  const fieldValue = this.state.fieldValues[key];

                  return (
                    <Subtotal
                      key={`sub_${index}`}
                      label={this.props.options[key].label}
                      cost={cost}
                      costLabel={this.formatAsCurrency(cost)}
                      totalLabel={`= ${this.formatAsCurrency(cost * fieldValue)}`}
                      fieldValue={fieldValue}
                      onChange={event => this.handleCountChange(event, key)}
                    />
                  );
                }
              })
          }
        </div>
        <div className="col-sm">
          <h6>Extras</h6>
          {
            Object.keys(this.props.options)
              .filter(key => this.props.options[key].type === 'toggle')
              .map((key, index) => {
                const cost = this.props.costs[key];

                if (cost) {
                  const checked = this.state.fieldValues[key];

                  return (
                    <Toggle
                      key={`toggle_${index}`}
                      label={this.props.options[key].label}
                      totalLabel={checked ? `Yes, ${this.formatAsCurrency(cost)}` : 'No'}
                      checked={Boolean(checked)}
                      onChange={event => this.handleToggleChange(event, key)}
                    />
                  );
                }
              })
          }
        </div>
        <div className="col-sm">
          <h6>Sizes and Coupons</h6>
          {
            Object.keys(this.props.options)
              .filter(key => this.props.options[key].type === 'multiplier')
              .map((key, index) => {
                const cost = this.props.costs[key];
                if (cost) {
                  const checked = this.state.fieldValues[key];

                  return (
                    <Toggle
                      key={`mult_${index}`}
                      label={this.props.options[key].label}
                      totalLabel={checked ? 'Yes' : 'No'}
                      checked={Boolean(checked)}
                      onChange={event => this.handleToggleChange(event, key)}
                    />
                  );
                }
              })
          }
        </div>
        <footer className="fixed-bottom bg-inverse text-success text-center">
          <h1>
            {this.calculateTotal()}
          </h1>
        </footer>
      </div>
    );
  }
}

Total.propTypes = {
  options: PropTypes.object.isRequired,
  costs: PropTypes.object.isRequired
};

export default Total;
