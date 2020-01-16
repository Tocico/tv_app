import React from 'react';
import { shallow } from 'enzyme';
import Dialogue from '../components/dialogue/Dialogue'

describe('render <Dialogue />', () => {
    beforeEach(() => {
        jest.resetModules();
    })

    afterEach(() => {
        jest.resetModules();
    })
    test('should render tv show title', () => {
        const data = { name: 'naruto' }
        const wrapper = shallow(<Dialogue dialogueInfo={data} />)
        expect(wrapper.find('.name').contains('naruto')).toBeTruthy()
    })

    test('should render genres, languages and season', () => {
        const data = {
            id: 1,
            url: 'https://www.tvmaze.com/shows/80/modern-family',
            name: 'Modern Family',
            type: 'Scripted',
            language: 'English',
            genres: 'comedy',
            image: {
                medium: 'naruto.medium.jpg',
                original: 'naruto.original.jpg'
            },
            summary:
                '<p><b>Modern Family</b> revolves around three different types of families (nuclear, step- and same-sex) living in the Los Angeles area, who are interrelated through Jay Pritchett and his children, Claire Dunphy (née Pritchett) and Mitchell Pritchett. Patriarch Jay is remarried to a much younger woman, Gloria Delgado Pritchett (née Ramirez), a passionate Colombian with whom he has an infant son, Fulgencio (Joe) Pritchett, and a son from Gloria\'s previous marriage, Manny Delgado.</p><p>Jay\'s daughter Claire was a homemaker, but has returned to the business world. She is now the chief executive of her father\'s previous business, Pritchett\'s Closets and Blinds. She is married to Phil Dunphy, a realtor and self-professed "cool dad". They have three children: Haley Dunphy, a stereotypical ditzy teenage girl; Alex Dunphy, a nerdy, smart middle child; and Luke Dunphy, the off-beat only son.</p><p>Jay\'s lawyer son Mitchell and his husband Cameron Tucker have one daughter, Lily Tucker-Pritchett. As the name suggests, this family represents a modern-day family, and episodes are comically based on situations which many families encounter in real life.</p>',
        }

        const wrapper = shallow(<Dialogue dialogueInfo={data} />)
        expect(wrapper.find('.genre').exists()).toBeTruthy()
        expect(wrapper.find('.language').exists()).toBeTruthy()
        expect(wrapper.find('.seasons').exists()).toBeTruthy()
    })

    test('should NOT render genres, languages and season if there is no value', () => {
        const wrapper = shallow(<Dialogue dialogueInfo='' />)
        expect(wrapper.find('.genre')).toHaveLength(0)
        expect(wrapper.find('.language')).toHaveLength(0)
        expect(wrapper.find('.seasons')).toHaveLength(0)
    })

})