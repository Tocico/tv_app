import React, { Component } from 'react'
import Dialogue from '../dialogue/Dialogue'
import { getVideo } from '../../server/api';


class TvShowList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentData: ""
        }
    }

    async  onClick(query) {
        const { tvShowItem } = await getVideo(query);
        this.setState({ recentData: tvShowItem })
    }
    render() {
        const showList = this.props.showList
        return (
            <>
                <div className="showList">
                    {showList.showList.map((item, key) => {
                        return (
                            <label key={key} htmlFor="trigger" className="open_button" ><img onClick={() => { this.onClick(item.id) }} src={item.image.medium} alt={item.name} data-test={item.id} className="showImg"></img></label>
                        )
                    })}
                </div>
                <Dialogue dialogueInfo={this.state.recentData} />
            </>
        )
    }
}


export default TvShowList;