import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Toggle from '../../src/components/Toggle';

describe('<Toggle />', function() {
  it('renders the component', function() {
    const wrapper = shallow(<Toggle label="Foo" onChange={sinon.spy()} />);
    expect(wrapper.find('.toggle-wrapper')).to.be.lengthOf(1);
  });

  it('renders the provided label', function() {
    const wrapper = shallow(<Toggle label="Foo" onChange={sinon.spy()} />);
    expect(wrapper.find('label').text()).to.contain('Foo');
  });

  it('renders the input as unchecked by default', function() {
    const wrapper = shallow(<Toggle label="Foo" onChange={sinon.spy()} />);
    expect(wrapper.find('input').html()).to.not.contain('checked');
  });

  it('renders the input as checked when option toggled', function() {
    const wrapper = shallow(<Toggle label="Foo" checked={true} onChange={sinon.spy()} />);
    expect(wrapper.find('input').html()).to.contain('checked');
  });

  it('calls the change callback when clicked', function() {
    const onClick = sinon.spy();
    const wrapper = shallow(<Toggle label="Foo" onChange={onClick} />);
    wrapper.find('input').simulate('change');
    expect(onClick).to.have.property('callCount', 1);
  });
});
