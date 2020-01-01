import React from 'react'

function Dialogue({dialogueInfo, dialogueIsShown}){
    console.log(dialogueIsShown)
    return <div className={dialogueIsShown ? "dialogue" : "dialogue hidden"}>Heej</div>
}

export default Dialogue