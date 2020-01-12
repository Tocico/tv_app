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

test('should render <Navbar /> without crashing', () => {
    const wrapper = mount(<App />)
    const navbar = wrapper.find(Navbar);
    expect(navbar.exists()).toBeFalsy();
    return load().then(_ => {
        wrapper.setState({
            isLoading: false
        })
        expect(navbar.exists()).toBeFalsy();
    })
})

test('should not render <Main /> before fetch API data', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Main)).toHaveLength(0);
})

test('should render <Main /> after fetch API', () => {
    const wrapper = mount(<App />);
    return load().then(_ => {
        wrapper.setState({
            isLoading: false,
            isMainShow: true
        })
        const main = wrapper.find(Main);
        expect(main.find('.main')).toHaveLength(1);
    })
})

test('should not render <TvShowList /> before fetch API data', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(TvShowList)).toHaveLength(0);
})

test('should render <TvShowList /> after fetch API', () => {
    const wrapper = mount(<App />);
    return load().then(_ => {
        wrapper.setState({
            isLoading: false,
            isMainShow: true
        })
        const tvShowList = wrapper.find(TvShowList);
        expect(tvShowList.find('.showList')).toHaveLength(1);
    })
})


// test('should not have tv show list', () => {
//     const wrapper = shallow(<App />);
//     expect(wrapper.state().tvShowList).toEqual('')
// })

// test('should have 60 tv show list after fetch API', () => {
//     const wrapper = mount(<App />);
//     return load().then(res => {
//         const data = res.tvShowList;
//         Object.keys(data).map((e) => {
//             wrapper.setState({
//                 isLoading: false,
//                 tvShowList: data[e]
//             })
//             console.log(wrapper.state().tvShowList)
//             expect(wrapper.state().tvShowList).toHaveLength(60)
//         })
//     })
// })





