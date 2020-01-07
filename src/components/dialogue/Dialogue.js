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
    //Make a group by season
    const grouped = {};
    episodes.map(episode => {
        // episode.map(season => console.log(season.season))
        for (let client of episode) {
            if (!(client.season in grouped)) grouped[client.season] = [client];
            else grouped[client.season].push(client);
        }
    })


    return (
        <>
            <div className="modal_wrap">
                <input id="trigger" type="checkbox" />
                <div className="modal_overlay">
                    <label htmlFor="trigger" className="modal_trigger"></label>
                    <div className="modal_content">
                        <label htmlFor="trigger" className="close_button">✖️</label>
                        {
                            !dialogueInfo ? '' :
                                <div className="dialogue">
                                    <div className="container">
                                        <div className="left" className="pStyle">
                                            <h2>{dialogueInfo.name}</h2>
                                            {
                                                dialogueInfo.language ?
                                                    <div><span className="lightBlack">Languages: </span>{dialogueInfo.language}</div> : ''
                                            }
                                            {
                                                dialogueInfo.genres ? <div><span className="lightBlack">Genres: </span>{genre.map((genre, key) => (<span key={key}>{genre}&nbsp;&nbsp;</span>))}</div> : ''
                                            }
                                            {
                                                episodes ? <><div className="lightBlack">Season: {Object.keys(grouped).length}</div></> : ''
                                            }

                                        </div>
                                        <div className="right">
                                            <img src={images[0]} />
                                        </div>
                                    </div>
                                    <div className="summary">
                                        <div dangerouslySetInnerHTML={{ __html: dialogueInfo.summary }} className="summary_text pStyle"></div>
                                    </div>
                                    {
                                        episodes ? <>
                                            {Object.keys(grouped).map((episode, key) => (<>
                                                <div className="season" key={key}>Season {episode}</div>
                                                <div className="container">
                                                    {grouped[episode].map(e => (
                                                        <>
                                                            <div className="container_image">
                                                                <div className="showTitle">
                                                                    <h4>{e.name}</h4>
                                                                    <div className="num">Episode {e.number}</div>
                                                                </div>
                                                                {e.image && e.image['medium'] ? <img src={e.image['medium']} key={key} className="episodeImage"></img> : <div className="noImage"></div>}
                                                            </div>
                                                        </>
                                                    ))}
                                                </div>
                                            </>))}
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