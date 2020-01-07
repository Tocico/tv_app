import React, { useState } from 'react'
import Dialogue from '../dialogue/Dialogue'
import { getVideo } from '../../server/index';


function Results({ result }) {
    const [recentData, setRecentData] = useState('');

    function forLoop(image) {
        for (const i in image) {
            return image['medium']
        }
    }

    async function onClick(query) {
        const { tvShowItem } = await getVideo(query);
        setRecentData(tvShowItem);
    }


    return (
        <>
        <div className="showList">
            {Object.keys(result).map((e, key) => (
                <>
                    <label key={key} htmlFor="trigger" className="open_button" >
                        {result[e].show.image ?
                            <img onClick={() => { onClick(result[e].show.id) }} src={forLoop(result[e].show.image)}></img> :
                            <div onClick={() => { onClick(result[e].show.id) }} className="empty"><h3>{result[e].show.name}</h3></div>
                        }
                    </label></>
            ))}
        </div>
                        <Dialogue dialogueInfo={recentData} />
        </>
    )
}

export default Results
