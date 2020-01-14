import React from 'react'
import { mount } from 'enzyme'
import Search from '../components/search/Search'
import Results from '../components/search/Results'
import { searchTvShow } from '../server/api'

test('should render <Results />', () => {
    const wrapperSearch = mount(<Search />)
    const searchWord = 'naruto'
    return searchTvShow(searchWord).then(res => {
        wrapperSearch.setState({
            result: res.searchTvShow
        })
        const wrapper = mount(<Results result={wrapperSearch.state().result} />)
        expect(wrapper.find('.result_box').exists()).toBeTruthy()
    })
})

test('should render <img /> if there is medium size image', () => {
    const result = [{
        show:
        {
            id: 495,
            name: 'Naruto',
            image: {
                medium: 'naruto.medium.jpg',
                original: 'naruto.original.jpg'
            }
        }
    }]
    const wrapper = mount(<Results result={result} />)
    expect(wrapper.find('.result_Img').exists()).toBeTruthy();
})

test('should render <div /> if there is no medium size image', () => {
    const result = [{
        show:
        {
            id: 495,
            name: 'Naruto'
        }
    }]
    const wrapper = mount(<Results result={result} />)
    expect(wrapper.find('.empty').exists()).toBeTruthy();
})