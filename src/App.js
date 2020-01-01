import React, { Component } from "react";
import Loading from "./components/loading/Loading";
import { load } from "./data/index";
import TvShowList from "./components/list/TvShowList"
import VideoList from "./components/list/VideoList";
import Search from "./components/search/Search";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      videos: [],
      mainTvShow: {
        name: '',
        image: '',
        summary: ''
      },
      tvShowList: ''
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { videoList, tvShow, tvShowList } = await load();
    console.log(tvShow)
    this.setState({
      isLoading: false,
      videos: videoList,
      mainTvShow: {
        name: tvShow.tvName,
        image: tvShow.oneImage,
        summary: tvShow.summary
      },
      tvShowList: tvShowList
    });
  }



  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Loading />
        ) : (
            <>
              {/* <Search image={this.state.image}/> */}
              <div className="main">
                <div className="img">
                  <img className='main-img' src={this.state.mainTvShow.image}></img>
                </div>
                <div className="text">
                  <h1 className="mainName">{this.state.mainTvShow.name}</h1>
                  <div dangerouslySetInnerHTML={{ __html: this.state.mainTvShow.summary }}></div>
                </div>
              </div>
              <div className="showList">
              <TvShowList showList={this.state.tvShowList}></TvShowList>
              </div>
            </>
          )}
      </>
    );
  }
}

export default App;
