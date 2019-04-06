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
describe('Sandwiches have default base price', function() {
    let costs = {
        basePrice: 3
    }
    let options = {
        basePrice: {label: "Base Price", type: "basePrice"}
    }
    beforeEach(function() {
        this.wrapper = shallow(<Total costs={costs} options = {options} />);
    });
    it('should display the total as the default base line price', function(){
        expect(this.wrapper.find('.fixed-bottom h1').text()).to.contain(costs.basePrice.toString());
    });
});
describe('Large and Small options are toggled cannot be toggled at the same time', function() {
    let costs = {
        basePrice: 3
    }
    let options = {
        basePrice: {label: "Base Price", type: "basePrice"}
    }
    beforeEach(function() {
        this.wrapper = shallow(<Total costs={costs} options = {options} />);
    });
    it('should display the total as the default base line price', function(){
        expect(this.wrapper.find('.fixed-bottom h1').text()).to.contain(costs.basePrice.toString());
    });
});
