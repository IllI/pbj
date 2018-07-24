import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Total from '../../src/components/Total';

describe('<Total />', function() {
  beforeEach(function() {
    this.wrapper = shallow(<Total costs={{}} options={{}} />);
  });

  it('renders', function() {
    expect(this.wrapper.find('.Total')).to.be.lengthOf(1);
  });
});
