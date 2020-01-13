import React from 'react';
import { mount } from 'enzyme';
import Navbar from '../components/header/Navbar';
import Search from '../components/search/Search';

beforeEach(() => {
    jest.resetModules();
})

afterEach(() => {
    jest.resetModules();
})

test('should change state showMenu after click search icon ', () => {
    const wrapper = mount(<Navbar />);
    expect(wrapper.state().showMenu).toBe(false)
    wrapper.find('.menuTrigger').simulate('click')
    expect(wrapper.state().showMenu).toBe(true)
})

test('should render <Search /> after click search icon', () => {
    const wrapper = mount(<Navbar />);
    expect(wrapper.find(Search).exists()).toBeFalsy()
    wrapper.find('.menuTrigger').simulate('click')
    expect(wrapper.find(Search).exists()).toBeTruthy()
})

test('should NOT render <Search /> after click search icon on Search page', () => {
    const wrapper = mount(<Navbar />);
    wrapper.find('.menuTrigger').simulate('click')
    expect(wrapper.find(Search).exists()).toBeTruthy()
    wrapper.find('.menuTrigger').simulate('click')
    expect(wrapper.find(Search).exists()).toBeFalsy()
})

test('should change state isMainShown and render <Search /> after click search icon', () => {
    const wrapper = mount(<Navbar isMainShown={() => {}}/>);
    expect(wrapper.find(Search).exists()).toBeFalsy()
    wrapper.find('.fa-search').simulate('click')
    expect(wrapper.find(Search).exists()).toBeTruthy()
})

test('should change state isMainShown and NOT render <Search /> after click search icon', () => {
    const wrapper = mount(<Navbar isMainShown={() => {}}/>);
    wrapper.find('.fa-search').simulate('click')
    expect(wrapper.find(Search).exists()).toBeTruthy()
    wrapper.find('.fa-search').simulate('click')
    expect(wrapper.find(Search).exists()).toBeFalsy()
})

