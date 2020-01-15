import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { load } from '../server/api';
import Main from '../components/main/Main';
import TvShowList from '../components/list/TvShowList';
import Navbar from '../components/header/Navbar'

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

// test('should render <Navbar /> without crashing', () => {
//     expect.assertions(2);
//     const wrapper = shallow(<App />)
//     const navbar = wrapper.find(Navbar);
//     expect(navbar.exists()).toBeFalsy();
//         wrapper.setState({ isLoading: false })
//         expect(navbar.exists()).toBeFalsy();
// })

test('should not render <Main /> before fetch API data', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Main)).toHaveLength(0);
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

test('should not render <TvShowList /> before fetch API data', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(TvShowList)).toHaveLength(0);
})

test('should change state tvShowList after fetch API', () => {
    expect.assertions(2);
    return load().then(res => {
        const wrapper = mount(<App />);
        expect(wrapper.state().tvShowList).toBe('')
        wrapper.setState({
            isLoading: false,
            isMainShow: true,
            tvShowList: res.tvShowList
        })
        expect(wrapper.state().tvShowList).toBe(res.tvShowList);
    })
})


// test.only('should throw an error', () => {
//     const wrapper = mount(<App />)
//     wrapper.setState({
//         isLoading: true,
//         error : 'error'
//     })
//         expect(wrapper.find('.error').exists()).toBe(true)
// });






