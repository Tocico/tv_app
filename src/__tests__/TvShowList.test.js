import React from 'react';
import { mount } from 'enzyme';
import TvShowList from '../components/list/TvShowList';
import Dialogue from '../components/dialogue/Dialogue'
import { showList } from '../utilities/tvShowListMock'
import { act } from 'react-dom/test-utils';
import { getVideo } from '../server/api';




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

    test('should work onClick() when click on tv show images', async () => {
        const wrapper = mount(<TvShowList showList={showList} />)
        const id = showList.showList[0].id
        const name = showList.showList[0].name
        wrapper.find(`[data-test=${id}]`).simulate('click', id)
        await act(async () => {
            await getVideo(id).then(_ => {
                wrapper.setState({ })
            })
            expect(wrapper.find(Dialogue).find('.name').text()).toBe(name)
        })
    })
})



