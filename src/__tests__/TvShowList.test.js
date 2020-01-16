import React from 'react';
import { mount } from 'enzyme';
import TvShowList from '../components/list/TvShowList';
import Dialogue from '../components/dialogue/Dialogue'
import { showList } from '../utilities/tvShowListMock'
import { act } from 'react-dom/test-utils';



describe('render <TvShowList />', () => {

    beforeEach(() => {
        jest.resetModules();
    })
    
    afterEach(() => {
        jest.resetModules();
    })


    test('should render 20 tv show in <TvShowList />', () => {
        const wrapper = mount(<TvShowList showList={showList} />)
        expect(wrapper.find(TvShowList).find('.open_button')).toHaveLength(20)
    })

    test('should call onClick()', () => {
        const fn = jest.fn()
        const wrapper = mount(<TvShowList showList={fn} />)
        wrapper.instance().onClick(1)
        expect(fn).toBeCalled(1)
    })

    test('should work onClick() when click on tv show images', () => {
        const wrapper = mount(<TvShowList showList={showList} />)
        const id = Object.keys(showList).map(e => {
            const id = showList[e][0].id //Choose first tv show and get id
            const name = showList[e][0].name
            return { id, name };
        })
        wrapper.find(TvShowList).find(`[data-test=${id[0].id}]`).simulate('click')
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
        act(() => {
            const wrapperDialogue = mount(<Dialogue dialogueInfo={data} />)
            expect(wrapperDialogue.find('.name').text()).toBe(id[0].name)
        })
    })
})



