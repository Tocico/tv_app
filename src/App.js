import React, { Component } from "react";
import Loading from "./components/loading/Loading";
import { load } from "./server/api";
import TvShowList from "./components/list/TvShowList";
import Navbar from "./components/header/Navbar";
import Main from "./components/main/Main"


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      mainTvShow: {
        name: '',
        image: '',
        summary: '',
      },
      tvShowList: '',
      isMainShown: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { tvShow, tvShowList } = await load();

    this.setState({
      isLoading: false,
      mainTvShow: {
        name: tvShow.tvName,
        image: tvShow.oneImage,
        summary: tvShow.summary,
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
              <Navbar isMainShown={() => { this.setState({ isMainShown: !this.state.isMainShown }) }} />
              {this.state.isMainShown ?
                <>
                  {this.state.mainTvShow ? <Main mainTvShow={this.state.mainTvShow} /> : '' }
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
