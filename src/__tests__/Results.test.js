import React from 'react'
import { mount } from 'enzyme'
import Search from '../components/search/Search'
import Results from '../components/search/Results'
import Dialogue from '../components/dialogue/Dialogue'
import { getVideo } from '../server/api'
import { act } from 'react-dom/test-utils';

beforeEach(() => {
    jest.resetModules();
})

afterEach(() => {
    jest.resetModules();
})


test('should render <Results />', () => {
    const wrapperSearch = mount(<Search />)
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
    wrapperSearch.setState({
        result: result
    })
    const wrapper = mount(<Results result={wrapperSearch.state().result} />)
    expect(wrapper.find('.result_box').exists()).toBeTruthy()
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

test('should call onClick() when click on image', async () => {
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
    const id = result[0].show.id
    const name = result[0].show.name
    wrapper.find('.result_Img').simulate('click', id)

    await act(async () => {
        await getVideo(id).then(res => {
            const wrapperDialogue = mount(<Dialogue dialogueInfo={res.tvShowItem} />)
            expect(wrapperDialogue.find('.name').text()).toBe(name)
        })
    })
})

test('should call onClick() when click on EMPTY image box', async () => {
    const result = [{
        show:
        {
            id: 495,
            name: 'Naruto',
        }
    }]
    const wrapper = mount(<Results result={result} />)
    const id = result[0].show.id
    const name = result[0].show.name
    wrapper.find('.empty').simulate('click', id)
    await act(async () => {
        await getVideo(id).then(res => {
            const wrapperDialogue = mount(<Dialogue dialogueInfo={res.tvShowItem} />)
            expect(wrapperDialogue.find('.name').text()).toBe(name)
        })
    })
})