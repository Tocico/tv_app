import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { load } from '../server/api';
import Main from '../components/main/Main';
import TvShowList from '../components/list/TvShowList';

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

test('should change state mainTvShow after fetch API', () => {
    expect.assertions(6);
    return load().then(res => {
        const wrapper = mount(<App />);
        expect(wrapper.state().mainTvShow.name).toBe('');
        expect(wrapper.state().mainTvShow.image).toBe('');
        expect(wrapper.state().mainTvShow.summary).toBe('');
        wrapper.setState({
            isLoading: false,
            isMainShow: true,
            mainTvShow: {
                name: res.tvShow.tvName,
                image: res.tvShow.oneImage,
                summary: res.tvShow.summary,
            }
        })
        expect(wrapper.state().mainTvShow.name).toBe(res.tvShow.tvName);
        expect(wrapper.state().mainTvShow.image).toBe(res.tvShow.oneImage);
        expect(wrapper.state().mainTvShow.summary).toBe(res.tvShow.summary);
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








