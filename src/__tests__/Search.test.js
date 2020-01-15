import React from 'react';
import { mount } from 'enzyme';
import Search from '../components/search/Search'
import Results from '../components/search/Results';
import { searchTvShow } from '../server/api'


beforeEach(() => {
    jest.resetModules();
})

afterEach(() => {
    jest.resetModules();
})

test('should call handleChange() and change setState searchWord when user write something on search', () => {
    const wrapper = mount(<Search />)
    const searchWord = { target: { name: 'searchWord', value: 'Naruto' } }
    wrapper.find('input[type="text"]').simulate('change', searchWord)
    expect(wrapper.state().searchWord).toBe('Naruto')
})

test('delete placeholder text when user click on cross mark', () => {
    const wrapper = mount(<Search />)
    const searchWord = { target: { name: 'searchWord', value: 'Naruto' } }
    wrapper.find('input[type="text"]').simulate('change', searchWord)
    wrapper.find('.fa-times').simulate('click')
    expect(wrapper.state().searchWord).toBe("")
})

test('should render EMPTY <Results /> when search word is empty', () => {
    const wrapper = mount(<Search />)
    const searchWord = { target: { name: 'searchWord', value: "" } }
    wrapper.find('input[type="text"]').simulate('change', searchWord)
    expect(wrapper.state().result).toStrictEqual([])
})

test('should show cross mark when user click on search input', () => {
    const wrapper = mount(<Search />)
    wrapper.find('input[type="text"]').simulate('click')
    expect(wrapper.find('.fa-times').exists()).toBeTruthy()
})

test('fail searching should return error message', () => {
    const wrapper = mount(<Search />)
    const errorSearchWord = { target: { name: 'searchWord', value: "sdgdgsdfsdfsdfsdfsdfsdfdfdfdf" } }
    wrapper.find('input[type="text"]').simulate('change', errorSearchWord )
    const errorMsg = 'no show';
    wrapper.setState({
        error : errorMsg
    })
    expect(wrapper.find('.errorMsg').exists()).toBeTruthy()
})

test('should render <Results /> when seaching', () => {
    const wrapper = mount(<Search />)
    const searchWord = { target: { name: 'searchWord', value: 'Naruto' } }
    wrapper.find('input[type="text"]').simulate('change', searchWord)

      return searchTvShow(wrapper.state().searchWord).then(res => {
           wrapper.setState({
               result: res.searchTvShow
           })  
           expect(wrapper.find(Results).exists).toBeTruthy()
      })
})

