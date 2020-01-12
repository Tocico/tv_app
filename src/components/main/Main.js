import React from 'react'

export default function Main({ mainTvShow }) {

    return(
    <div className="main">
        <div className="img">
            <img className='main-img' src={mainTvShow.image} alt={mainTvShow.name}></img>
        </div>
        <div className="text">
            <h1 className="mainName">{mainTvShow.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: mainTvShow.summary }} className="main-summary"></div>
        </div>
    </div>)
}