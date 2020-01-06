import React, { useState } from 'react'
import Dialogue from '../list/Dialogue'
import { getVideo } from '../../data/index';


function Results({ result }) {
    const [recentData, setRecentData] = useState('');

    function forLoop(image) {
        for (const i in image) {
            return image['medium']
        }
    }

    async function onClick(item) {
        const { tvShowItem } = await getVideo(item);
        setRecentData(tvShowItem);
    }


    return (
        <>
        <div className="showList">
            {Object.keys(result).map((e, key) => (
                <>
                    <label key={key} htmlFor="trigger" className="open_button" >
                        {result[e].show.image ?
                            <img onClick={() => { onClick(result[e].show.name) }} src={forLoop(result[e].show.image)}></img> :
                            <div onClick={() => { onClick(result[e].show.name) }} className="empty"><h3>{result[e].show.name}</h3></div>
                        }
                    </label></>
            ))}
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

export default Results
