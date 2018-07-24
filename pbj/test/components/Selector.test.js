import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Selector from '../../src/components/Selector';

describe('<Selector />', function() {
  it('renders the component', function() {
    const wrapper = shallow(<Selector label="Foo" options={[]} onChange={sinon.spy()} />);
    expect(wrapper.find('.cost-selector-wrapper')).to.be.lengthOf(1);
  });

  it('renders the provided label', function() {
    const wrapper = shallow(<Selector label="Foo" options={[]} onChange={sinon.spy()} />);
    expect(wrapper.find('h5').text()).to.contain('Foo');
  });
});
