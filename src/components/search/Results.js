import React, { Component } from 'react'
import Dialogue from '../dialogue/Dialogue'
import { getVideo } from '../../server/api';


class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentData: ""
        }
    }

    forLoop = (image) => {
        for (const i in image) {
            return image['medium']
        }
    }

    async onClick(query) {
        const { tvShowItem } = await getVideo(query);
        this.setState({ recentData: tvShowItem })
    }

    render() {
        const result = this.props.result
        return (
            <>
                <div className="showList">
                    {Object.keys(result).map((e, key) => (
                        <React.Fragment key={key}>
                            <label htmlFor="trigger" className="open_button result_box" >
                                {result[e].show.image ?
                                    <img className='result_Img' onClick={() => { this.onClick(result[e].show.id) }} src={this.forLoop(result[e].show.image)} alt={result[e].show.name}></img> :
                                    <div onClick={() => { this.onClick(result[e].show.id) }} className="empty"><h3>{result[e].show.name}</h3></div>
                                }
                            </label>
                        </React.Fragment>
                    ))}
                </div>
                <Dialogue dialogueInfo={this.state.recentData} />
            </>
        )
    }
}

export default Results
