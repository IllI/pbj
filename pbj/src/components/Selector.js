import React from 'react';
import PropTypes from 'prop-types';

const Selector = ({
  label,
  name,
  options,
  selected,
  onChange
}) => {
  const choices = options.map((option, index) =>
    (
      <label className={'btn ' + ((option === selected) ? 'btn-primary active' : 'btn-secondary')} key={name + '_' + index}>
        <input
          type="radio"
          value={option}
          name={name}
          onClick={onChange}
        />
        {option}
      </label>
    )
  );

  return (
    <div className="col text-center cost-selector-wrapper">
      <h5>
        {label}
      </h5>
      <div className="btn-group align-content-center" role="group" data-toggle="buttons">
        {choices}
      </div>
    </div>
  );
};

Selector.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Selector;
