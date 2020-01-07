import React, { Component } from "react";
import Loading from "./components/loading/Loading";
import { load } from "./server/index";
import TvShowList from "./components/list/TvShowList";
import Navbar from "./components/header/Navbar";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      videos: [],
      mainTvShow: {
        name: '',
        image: '',
        summary: '',
        id: ''
      },
      tvShowList: '',
      isMainShown: false,
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
        summary: tvShow.summary,
        id: tvShow.tvShowId
      },
      tvShowList: tvShowList,
      isMainShown: true,
    });
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Loading />
        ) : (
            <>
              <Navbar isMainShown={() => { this.setState({isMainShown: !this.state.isMainShown})}}/>
              {this.state.isMainShown ?
                <>
                  <div className="main">
                    <div className="img">
                      <img className='main-img' src={this.state.mainTvShow.image} alt='main pic'></img>
                    </div>
                    <div className="text">
                      <h1 className="mainName">{this.state.mainTvShow.name}</h1>
                      <div dangerouslySetInnerHTML={{ __html: this.state.mainTvShow.summary }}></div>
                    </div>
                  </div>
                  <div>
                    <TvShowList showList={this.state.tvShowList}></TvShowList>
                  </div></> : ''
              }
            </>
          )}
      </>
    );
  }
}

export default App;
