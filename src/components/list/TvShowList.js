import React, { useState } from 'react'
import Dialogue from '../dialogue/Dialogue'
import { getVideo } from '../../server/api';


function TvShowList({ showList }) {
    const [recentData, setRecentData] = useState('');

    async function onClick(query) {
        const { tvShowItem } = await getVideo(query);
        setRecentData(tvShowItem);
        console.log(tvShowItem)
    }

  


    return (
        <>
        <div className="showList">
            {showList.showList.map((item, key) => {
                return (
                        <label key={key} htmlFor="trigger" className="open_button" ><img onClick={() => { onClick(item.id) }} src={item.image.medium} alt={item.name}></img></label>
                )
            })}
            </div>
                        <Dialogue dialogueInfo={recentData} />
        </>
    )
}


export default TvShowList;