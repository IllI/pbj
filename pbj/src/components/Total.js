import React from 'react';
import PropTypes from 'prop-types';

import Subtotal from './Subtotal';
import Toggle from './Toggle';

class Total extends React.Component {
  constructor(props) {
    super(props);

    // Initialize all values to 0
    const initialValues = Object.keys(props.options).reduce((obj, key) => {
      obj[key] = 0;
      return obj;
    }, {});
    //set default sandwich choice to large as default price (satisfying
    initialValues['large']=1;
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
          case 'subtotal':
            total += cost * fieldValue;
            addOnCosts = total;
            break;
          case 'multiplier':
          case 'toggle':
            if (fieldValue) {
              total += cost;
              addOnCosts = total;
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
 * If a Subtotal field is blurred and left blank, reset default value to 0
 * @param  {Object} e   Event from DOM
 * @param  {String} key Option to update
 * @return {undefined}
 */
handleBlurChange(e, key) {
    if (!e.target.value){
        console.log('non')
        const nextFieldValues = Object.assign({}, this.state.fieldValues, { [key]: 0 });
        this.setState({ fieldValues: nextFieldValues });
    }
}
  /**
 * Update the value for the given sandwich option
 * @param  {Object} e   Event from DOM
 * @param  {String} key Option to update
 * @return {undefined}
 */
handleCountChange(e, key) {
    let value = e.target.value ? e.target.value.toString() : '0';
    let leadZero = false
    //Check if 0 is the most significant digit
    while(value.charAt(0) === '0' &&
          value.length > 1)
    {
        value = value.substr(1);
        if (!leadZero){
            leadZero = true;
        }
    }
    //For the case when the user deletes all the characters in the input field, reset value to empty string
    if (!value){
        value = 0;
    }
    const nextFieldValues = Object.assign({}, this.state.fieldValues, { [key]: Number(value) });
    //Masking zero values as react doesn't do validate natively
    if(leadZero){
        let resetField = nextFieldValues;
        console.log('lead', nextFieldValues);
        resetField[key]=value;
        this.setState({ fieldValues: resetField });
    }
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
    //the following conditional statements are to handle the bug of when large and small checkboxs
    // are both toggled on and when they're both toggled off
    if (key === 'large'){
        nextFieldValues['small'] = 0;
        nextFieldValues['large'] = 1;
    } else if (key === 'small'){
        nextFieldValues['small'] = 1;
        nextFieldValues['large'] = 0;
    }
    if (nextFieldValues['small']+nextFieldValues['large']===0){
        nextFieldValues['large'] = 1;
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
                      onBlur={event => this.handleBlurChange(event, key)}
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
