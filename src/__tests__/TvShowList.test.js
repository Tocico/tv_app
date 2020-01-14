import React from 'react';
import { mount } from 'enzyme';
import TvShowList from '../components/list/TvShowList';
import App from '../App'
import { load, getVideo } from '../server/api';
import Dialogue from '../components/dialogue/Dialogue'

describe('render <TvShowList />', () => {
    const wrapper = mount(<App />)
    
    test('should render 60 tv show in <TvShowList />', () => {
        expect(wrapper.find(TvShowList).find('.open_button')).toHaveLength(0)
        
        return load().then(res => {
            wrapper.setState({
                isLoading: false,
                isMainShown: true,
                tvShowList: res.tvShowList
            })
            expect(wrapper.find(TvShowList).find('.open_button')).toHaveLength(60)
        })
    })
    
    test('should work onClick() when click on tv show images', () => {
        const data = wrapper.state().tvShowList;
        Object.keys(data).map(e => {
           const id = data[e][0].id //Choose first tv show and get id
           wrapper.find(TvShowList).find(`[data-test=${id}]`).simulate('click')
           return getVideo(id).then(res => {
         
               const wrapperDialogue = mount(<Dialogue dialogueInfo={res.tvShowItem} />)
               expect(wrapperDialogue).toHaveLength(0)
               
           })

        })
       
    })
})
