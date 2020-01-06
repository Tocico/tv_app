import React, { useState, useEffect } from 'react'
import Dialogue from './Dialogue'
import { getVideo } from '../../data/index';


function TvShowList({ showList }) {
    // const [dialogueIsShown, setDialogueIsShown] = useState(false);
    const [recentData, setRecentData] = useState('');

    async function onClick(item) {
        // setDialogueIsShown(true);
        const { tvShowItem } = await getVideo(item);
        setRecentData(tvShowItem);
        console.log(tvShowItem)
    }

  


    return (
        <>
        <div className="showList">
            {showList.showList.map((item, key) => {
                return (
                    <>
                        <label key={key} htmlFor="trigger" className="open_button" ><img key={key} onClick={() => { onClick(item.name) }} src={item.image.medium}></img></label>
                    </>
                )
            })}
            </div>
            <div className="modal_wrap">
                <input id="trigger" type="checkbox" />
                <div className="modal_overlay">
                    <label htmlFor="trigger" className="modal_trigger"></label>
                    <div className="modal_content">
                        <label htmlFor="trigger" className="close_button">✖️</label>
                        <Dialogue dialogueInfo={recentData} />
                    </div>
                </div>
            </div>
        </>
    )
}


export default TvShowList;