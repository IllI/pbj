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
        large: 8
    }
    let options = {
        large: {label: "Large", type: "multiplier"}
    }
    beforeEach(function() {
        this.wrapper = shallow(<Total costs={costs} options = {options} />);
    });
    it('should display the total as the default base line price', function(){
        expect(this.wrapper.find('.fixed-bottom h1').text()).to.contain(costs.large.toString());
    });
});
describe('Small and Large toggles cannot be both on at the same time', function(){
    let costs = {
        large: 8,
        small: 4
    }
    let options = {
        small: {label: "Small", type: "multiplier"},
        large: {label: "Large", type: "multiplier"}
    }
    beforeEach(function() {
        this.wrapper = shallow(<Total costs={costs} options = {options} />);
    });
    it('should show large as selected by default', function(){
        this.wrapper.find('Toggle').forEach(function(size){
            let checked;
            size = size.dive();
            //checked = size.find('input').prop('checked');
            if (checked){
                let label = size.find('label').text();
                expect(label).to.equal(options.large.label);
            }
        });
    });
    it('should show only small size checked after selected', function(){
        let size;
        let small;
        this.wrapper.find('Toggle').forEach(function(size){
            let label;
            size = size.dive();
            label = size.find('label');
            if (label.text()===options.small.label){
                let input = label.find('input');
                input.get(0).props.onChange({target:input.get(0)}, "small")
                small = input;
            }
        });
        expect(this.wrapper.state().fieldValues.small).to.equal(1);
        expect(this.wrapper.state().fieldValues.large).to.equal(0);
    });
});
