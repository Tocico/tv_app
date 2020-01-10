import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { load } from '../server/api'

beforeEach(() => {
    jest.resetModules();
})

test('should render <App /> without crashing', () => {
    const wrapper = mount(<App />)
    expect(wrapper.exists()).toBeTruthy();
});

test('render loading animation while loading', () => {
    const wrapper = mount(<App />)
    wrapper.setState({
        isLoading: true
    })
    expect(wrapper.find('.loading-box').exists()).toBeTruthy();
})

test('disappear loading animation after loading finish', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
        isLoading: true
    })
    return load().then(_ => {
        wrapper.setState({
            isLoading: false
        })
        expect(wrapper.find('.loading-box').exists()).toBeFalsy();
    })
})

// test('render random one big image, title and text in the first page', () => {
//     const wrapper = mount(<App />);
//     return load().then(res => {
//         const tvShow = res.tvShow;
        
//         wrapper.setState({
//             mainTvShow: {
//                 name: tvShow.tvName,
//                 image: tvShow.oneImage,
//                 summary: tvShow.summary,
//                 id: tvShow.tvShowId,
//             }
//         })
//         const name = wrapper.state().mainTvShow.name;
//         expect(wrapper.find('.mainName')).toHaveLength(1);

// })

// test('list with rates', () => {
//     return loadRates().then(data => {
//         const wrapper = shallow(<App />);
//         const rates = mapObjectToArray(data.rates);
//         wrapper.setState({ rates });
//         const list = wrapper.find('.list-reset');
//         expect(list.children()).toHaveLength(31);
//     });
// });

// test('should list items when rates are filled', async () => {
//     const { rates } = await loadRates();
//     const wrapper = shallow(<App />);
//     wrapper.setState({ rates: mapObjectToArray(rates) });
//     expect(wrapper.find('li')).toHaveLength(31);
//     wrapper.find('input').simulate('change', {
//       target: { name: 'search', value: 'aud' }
//     });
//     expect(wrapper.find('li')).toHaveLength(1);
//    });


