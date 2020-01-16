import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import Loading from '../components/loading/Loading'
import { act } from 'react-dom/test-utils';

beforeEach(() => {
    jest.resetModules();
})

afterEach(() => {
    jest.resetModules();
})

test('render loading animation while loading', () => {
    const wrapper = mount(<App />);
    act(() => {
        wrapper.setState({
            isLoading: true
        })
    })
    const loading = wrapper.find(Loading);
    expect(loading.find('.loading-box')).toHaveLength(1);

})

test('disappear loading animation after loading finish', () => {
    const wrapper = mount(<App />);
    act(() => {
        wrapper.setState({
            isLoading: false
        })
    })
    const loading = wrapper.find(Loading);
    expect(loading.find('.loading-box')).toHaveLength(0);
})