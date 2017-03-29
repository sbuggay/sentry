import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Server from '../../../src/sentry/components/Server';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import reducer from '../../../src/sentry/reducer';
import { removeServer } from '../../../src/sentry/actions';
import { createStore } from 'redux';

test('Server', () => {
	const mockStore = configureStore();
	const initialState = {
		app: {
			servers: [{}, {}],
		}
	};

	let store, container;

	beforeEach(()=>{
		store = mockStore(initialState);
		container = shallow(<ConnectedServer store={store} />);
	})

	it('has a button to remove a server', () => {
		expect(component.contains(
			<div>
				<div className='fa fa-times'></div>
			</div>
		)).toBe(true);
	});

	it('checks removeServer on dispatch', () => {
		store.dispatch(removeServer(initialState.index));
		const action = store.getActions();

		expect(action[0].type).toBe('REMOVE_SERVER');
	});
});
