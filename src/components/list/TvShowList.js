import React, { useState } from 'react'
import Dialogue from './Dialogue'


function TvShowList({ showList }) {
    const [dialogueIsShown, setDialogueIsShown] = useState(false);
    const [recentData, setRecentData] = useState([]);


    function onClick(item) {
        setDialogueIsShown(true);
        setRecentData(item);
    }
    return (
        <>
            {showList.showList.map((item, key) => {
                return (
                    <>
                        <img onClick={() => { onClick(item) }} key={key} src={item.image.medium}></img>
                    </>
                )
            })}
            <Dialogue dialogueInfo={recentData} dialogueIsShown={dialogueIsShown}
            />
        </>
    )
}


export default TvShowList;