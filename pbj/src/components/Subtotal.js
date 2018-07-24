import React from 'react';
import PropTypes from 'prop-types';

const Subtotal = ({
  label,
  fieldValue = 0,
  costLabel,
  totalLabel,
  onChange,
  disabled
}) => (
  <div className="mb-2">
    <h6>{label}</h6>
    <div className="row no-gutters">
      <div className="col-8 input-group">
        <span className="input-group-addon">{costLabel}</span>
        <input
          className="form-control"
          placeholder="#"
          type="number"
          min={0}
          value={fieldValue}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <span className="input-group-addon text-success">{totalLabel}</span>
    </div>
  </div>
);

Subtotal.propTypes = {
  label: PropTypes.string.isRequired,
  fieldValue: PropTypes.number,
  costLabel: PropTypes.string,
  totalLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Subtotal;
