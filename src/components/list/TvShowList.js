import React, { useState } from 'react'
import Dialogue from '../dialogue/Dialogue'
import { getVideo } from '../../server/index';


function TvShowList({ showList }) {
    // const [dialogueIsShown, setDialogueIsShown] = useState(false);
    const [recentData, setRecentData] = useState('');

    async function onClick(query) {
        // setDialogueIsShown(true);
        const { tvShowItem } = await getVideo(query);
        setRecentData(tvShowItem);
        console.log(tvShowItem)
    }

  


    return (
        <>
        <div className="showList">
            {showList.showList.map((item, key) => {
                return (
                    <>
                        <label key={key} htmlFor="trigger" className="open_button" ><img key={key} onClick={() => { onClick(item.id) }} src={item.image.medium} alt={item.name}></img></label>
                    </>
                )
            })}
            </div>
                        <Dialogue dialogueInfo={recentData} />
        </>
    )
}


export default TvShowList;