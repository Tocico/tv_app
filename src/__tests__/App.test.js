import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { load } from '../server/api';
import Main from '../components/main/Main';
import TvShowList from '../components/list/TvShowList';
import Search from '../components/search/Search';

beforeEach(() => {
    jest.resetModules();
})

afterEach(() => {
    jest.resetModules();
})


test('should render <App /> without crashing', () => {
    const wrapper = mount(<App />)
    expect(wrapper.exists()).toBeTruthy();
});


describe("Before fetch API data", () => {

    test('should NOT render <Main /> before fetch API data', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Main)).toHaveLength(0);
    })

    test('should NOT render <TvShowList /> before fetch API data', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(TvShowList)).toHaveLength(0);
    })

})

test('should render <Main /> and <TvShowList /> after fetch API', () => {
    const wrapper = mount(<App />);
    return load().then(_ => {
        wrapper.setState({ })
    }).then(_ => {
        console.log(wrapper.state())
        expect(wrapper.find(Main).exists()).toBeTruthy()
        expect(wrapper.find(TvShowList).exists()).toBeTruthy()
    })
})

test('should call handleChange()', () => {
    const wrapper = shallow(<App />)
    wrapper.setState({
        isLoading: false
    })
    expect(wrapper.state().isMainShown).toBe(false)
    wrapper.instance().handleChange()
    expect(wrapper.state().isMainShown).toBe(true)
})

test('should render <Search /> when click on search icon', () => {
    const wrapper = shallow(<App />)
    wrapper.setState({
        isLoading: false,
        isMainShown : true
    })
    expect(wrapper.find(Search).exists()).toBeFalsy()
    wrapper.find('.menuTrigger').simulate('click')
    expect(wrapper.find(Search).exists()).toBeTruthy()
})









