import React from 'react';
import { mount } from 'enzyme';
import { load } from '../server/api';
import Main from '../components/main/Main';
import App from '../App'

beforeEach(() => {
    jest.resetModules();
})

afterEach(() => {
    jest.resetModules();
})

test('should render title, image and text', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Main).find('.mainName')).toHaveLength(0);
    expect(wrapper.find(Main).find('.main-img')).toHaveLength(0);
    expect(wrapper.find(Main).find('.main-summary')).toHaveLength(0);

    const data = {
        name: 'Naruto',
        image: 'naruto.jpg',
        summary: '<p>asdasdasdasdasd</p>'
    }
    wrapper.setState({ mainTvShow: data })

    const wrapperMain = mount(<Main mainTvShow={wrapper.state().mainTvShow} />);
    expect(wrapperMain.find('.mainName')).toHaveLength(1);
    expect(wrapperMain.find('.main-img')).toHaveLength(1);
    expect(wrapperMain.find('.main-summary')).toHaveLength(1);
})
