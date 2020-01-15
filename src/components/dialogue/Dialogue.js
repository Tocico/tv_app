import React from 'react'

function Dialogue({ dialogueInfo }) {
    const genres = dialogueInfo['genres'];
    const genre = [];
    for (const i in genres) {
        genre.push(genres[i])
    }


    const images = [];
    for (const i in dialogueInfo.image) {
        images.push(dialogueInfo.image[i])
    }

    const embedded = dialogueInfo['_embedded'];
    const episodes = [];
    const episodeCount = [];
    for (const i in embedded) {
        episodeCount.push(embedded[i].length);
        episodes.push(embedded[i])
    }
    //group by season
    const grouped = {};
    episodes.forEach((episode, _) => {
        for (let tvShow of episode) {
            if (!(tvShow.season in grouped)) grouped[tvShow.season] = [tvShow];
            else grouped[tvShow.season].push(tvShow);
        }
    })


    return (
        <>
            <div className="modal_wrap">
                <input id="trigger" type="checkbox" />
                <div className="modal_overlay">
                    <label htmlFor="trigger" className="modal_trigger"></label>
                    <div className="modal_content">
                        <label htmlFor="trigger" className="close_button"><span role="img" aria-label="cross">✖️</span></label>
                        {
                            !dialogueInfo ? '' :
                                <div className="dialogue">
                                    <div className="container">
                                        <div className="left pStyle">
                                            <h2 className="name">{dialogueInfo.name}</h2>
                                            {
                                                dialogueInfo.language ? <div className="language"><span className="lightBlack">Languages: </span>{dialogueInfo.language}</div> : ''
                                            }
                                            {
                                                dialogueInfo.genres ? <div><span className="lightBlack">Genres: </span>{genre.map((genre, key) => (<span key={key} className="genre">{genre}&nbsp;&nbsp;</span>))}</div> : ''
                                            }
                                            {
                                                episodes ? <><div className="lightBlack">Season: <span className="seasons">{Object.keys(grouped).length}</span></div></> : ''
                                            }

                                        </div>
                                        <div className="right">
                                            <img src={images[0]} alt={dialogueInfo.name}/>
                                        </div>
                                    </div>
                                    <div className="summary">
                                        <div dangerouslySetInnerHTML={{ __html: dialogueInfo.summary }} className="summary_text pStyle"></div>
                                    </div>
                                    {
                                        episodes ? <>
                                            {Object.keys(grouped).map((episode, key) => (<React.Fragment key={key}>
                                                <div className="season">Season {episode}</div>
                                                <div className="container">
                                                    {grouped[episode].map((e,key) => (
                                                        <React.Fragment key={key}>
                                                            <div className="container_image">
                                                                <div className="showTitle">
                                                                    <h4>{e.name}</h4>
                                                                    <div className="num" key={key}>Episode {e.number}</div>
                                                                </div>
                                                                {e.image && e.image['medium'] ? <img src={e.image['medium']} key={key} className="episodeImage" alt={e.name}></img> : <div className="noImage"></div>}
                                                            </div>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </React.Fragment>))}
                                        </> : ''
                                    }


                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dialogue