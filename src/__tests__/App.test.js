import React from 'react';
import { mount, shallow, render } from 'enzyme';
import App from '../App';
import { load } from '../server/api';
import Main from '../components/main/Main';
import TvShowList from '../components/list/TvShowList';



test('should render <App /> without crashing', () => {
    const wrapper = mount(<App />)
    expect(wrapper.exists()).toBeTruthy();
});

test.only('should not render <Main /> and <TvShowList /> before fetch API', () => {
    const wrapper = shallow(<App />);
    const main = wrapper.find(Main);
    const tvShowList = wrapper.find(TvShowList);
    expect(main.find('.main').exists()).toBeFalsy();
    expect(tvShowList.find('.showList').exists()).toBeFalsy();
})

test('should render <Main /> and <TvShowList /> before fetch API', () => {
    const wrapper = mount(<App />);
    return load().then(_ => {
            wrapper.setState({
                isMainShow: true
            })
        const main = wrapper.find(Main);
        const tvShowList = wrapper.find(TvShowList);
        expect(main.find('.main').exists()).toBeTruthy();
        expect(tvShowList.find('.showList').exists()).toBeTruthy();
    })


})

test('should not have title, image and text exist before fetch API data', () => {
    const wrapper = shallow(<App />);
    const mainTvShow = wrapper.state().mainTvShow;
    expect(mainTvShow.name).toEqual('')
    expect(mainTvShow.image).toEqual('')
    expect(mainTvShow.summary).toEqual('')
})

test('should have title, image and text after fetch API data', () => {
    const wrapper = mount(<App />);
    return load().then(res => {
        const tvShow = res.tvShow;

        wrapper.setState({
            mainTvShow: {
                name: tvShow.tvName,
                image: tvShow.oneImage,
                summary: tvShow.summary,

            }
        })
        const mainTvShow = wrapper.state().mainTvShow;
        expect(mainTvShow.name).toEqual(tvShow.tvName);
        expect(mainTvShow.image).toEqual(tvShow.oneImage);
        expect(mainTvShow.summary).toEqual(tvShow.summary);
    })
})

test('should not have tv show list', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().tvShowList).toEqual('')
})

test('should have 60 tv show list after fetch API', () => {
    const wrapper = mount(<App />);
    return load().then(res => {
        const data = res.tvShowList;
        Object.keys(data).map((e) => {
            wrapper.setState({
                tvShowList: data[e]
            })
            expect(wrapper.state().tvShowList).toHaveLength(60)
        })
    })
})





