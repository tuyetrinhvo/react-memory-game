import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from './App';
import GuessCount from './GuessCount';

describe('<App />', () => {
	it('render not empty', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.isEmptyRender()).to.equal(false);
	});
	it('class `memory` exists', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.exists('.memory')).to.equal(true);
	});
	it('contains a zero-guess counter', () => {
		const wrapper = shallow(<App />);
		expect(wrapper).to.contain(<GuessCount guesses={0} />);
	});
	it('has 36 cards', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Card')).to.have.length(36);
	});
});
