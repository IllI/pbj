import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({
  label,
  totalLabel,
  checked,
  onChange
}) => (
  <div className="row no-gutters toggle-wrapper">
    <div className="input-group">
      <label className={'btn btn-primary ' + (checked ? 'active ' : '') + 'col input-group-addon'}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          hidden
        />
        {label}
      </label>
      <span className={'input-group-addon ' + (checked ? 'text-success' : 'text-danger')}>{totalLabel}</span>
    </div>
  </div>
);

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  totalLabel: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Toggle;
