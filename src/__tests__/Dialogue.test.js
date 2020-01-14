import React from 'react';
import { shallow } from 'enzyme';
import { getVideo } from '../server/api';
import Dialogue from '../components/dialogue/Dialogue'

describe('render <Dialogue />', () => {
    test('should render tv show title', () => {
        const data = { name: 'naruto' }
        const wrapper = shallow(<Dialogue dialogueInfo={data} />)
        expect(wrapper.find('.name').contains('naruto')).toBeTruthy()
    })

    test('should render genres, languages and season', () => {
        return getVideo(1).then(res => {
            const wrapper = shallow(<Dialogue dialogueInfo={res.tvShowItem} />)
            expect(wrapper.find('.genre').exists()).toBeTruthy()
            expect(wrapper.find('.language').exists()).toBeTruthy()
            expect(wrapper.find('.seasons').exists()).toBeTruthy()
        })
    })

    test('should NOT render genres, languages and season if there is no value', () => {
        const wrapper = shallow(<Dialogue dialogueInfo='' />)
        expect(wrapper.find('.genre')).toHaveLength(0)
        expect(wrapper.find('.language')).toHaveLength(0)
        expect(wrapper.find('.seasons')).toHaveLength(0)
    })

})