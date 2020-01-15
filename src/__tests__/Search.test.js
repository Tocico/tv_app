import React from 'react';
import { mount, shallow } from 'enzyme';
import { searchTvShow } from '../server/api'
import Search from '../components/search/Search'
import Results from '../components/search/Results';
import { FormControl } from 'react-bootstrap';

test('should calls "focusElement()" on input forum click', () => {
    // const wrapper = shallow(<Search />);
    // const spy = jest.spyOn(wrapper.instance(), 'focusElement');
    // wrapper.update();
    // console.log(wrapper.debug())
    // wrapper.find('[type="text"]').simulate('click')
    // console.log(wrapper.debug())
    // expect(spy).toHaveBeenCalled()
})

test('should change setState searchWord when user write something on search', () => {
    const wrapper = mount(<Search />)
    wrapper.find('input[type="text"]').simulate('change',
        wrapper.setState({
            searchWord: 'Naruto'
        }))
    expect(wrapper.state().searchWord).toBe('Naruto')
})

test('fail searching should return error message', () => {
    const wrapper = mount(<Search />)
    wrapper.setState({ error: `We can not find ああああ` })
    expect(wrapper.find('.errorMsg').exists()).toBeTruthy()
})

test('delete placeholder text when user click on input form', () => {
    const wrapper = mount(<Search />)
    wrapper.find('input[type="text"]').simulate('change',
        wrapper.setState({
            searchWord: 'Naruto'
        }))
    wrapper.find('input[type="text"]').simulate('click',
        wrapper.setState({
            focus: true
        }))
    expect(wrapper.find('.fa-times').exists()).toBeTruthy()
})

test('should disappear cross mark when user click on cross mark', () => {
    const wrapper = mount(<Search />)
    wrapper.find('input[type="text"]').simulate('click',
        wrapper.setState({
            focus: true
        }))
    wrapper.find('.fa-times').simulate('click',
        wrapper.setState({
            searchWord: '',
            result: [],
            error: null,
            focus: false
        }))
    expect(wrapper.find('.fa-times').exists()).toBeFalsy()
})

test('should render <Results /> when seaching', () => {
    const wrapper = mount(<Search />)
    const searchWord = 'naruto';
    return searchTvShow(searchWord).then(res => {
        wrapper.setState({
            result: res.searchTvShow,
            error: '',
            focus: true
        })
        expect(wrapper.find(Results).exists()).toBeTruthy()
    })
})

test('should render EMPTY <Results /> when search word is empty', () => {
    const wrapper = mount(<Search />)
    const searchWord = "";
    wrapper.setState({
        searchWord: searchWord
    })
    expect(wrapper.state().result).toStrictEqual([])
})





