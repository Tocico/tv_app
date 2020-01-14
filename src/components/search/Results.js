import React, { useState } from 'react'
import Dialogue from '../dialogue/Dialogue'
import { getVideo } from '../../server/api';


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
                    <React.Fragment key={key}>
                        <label htmlFor="trigger" className="open_button result_box" >
                            {result[e].show.image ?
                                <img className='result_Img' onClick={() => { onClick(result[e].show.id) }} src={forLoop(result[e].show.image)} alt={result[e].show.name}></img> :
                                <div onClick={() => { onClick(result[e].show.id) }} className="empty"><h3>{result[e].show.name}</h3></div>
                            }
                        </label>
                    </React.Fragment>
                ))}
            </div>
            <Dialogue dialogueInfo={recentData} />
        </>
    )
}

export default Results
