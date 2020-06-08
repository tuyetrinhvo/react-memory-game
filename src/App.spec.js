import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import App, { SYMBOLS } from './App';
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
	it('should match its reference snapshot', () => {
		const mock = sinon.stub(App.prototype, 'generateCards').returns([ ...SYMBOLS.repeat(2) ]);
		try {
			const wrapper = shallow(<App />);
			expect(wrapper).to.matchSnapshot();
		} finally {
			mock.restore();
		}
	});
});
