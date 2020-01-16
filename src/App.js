import React, { Component } from "react";
import Loading from "./components/loading/Loading";
import { load } from "./server/api";
import TvShowList from "./components/list/TvShowList";
import Main from "./components/main/Main"
import Search from "./components/search/Search"


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

  componentDidMount = () => {
    this.setState({ isLoading: true });
    load().then(res => {
      this.setState({
        isLoading: false,
        mainTvShow: {
          name: res.tvShow.tvName,
          image: res.tvShow.oneImage,
          summary: res.tvShow.summary,
        },
        tvShowList: res.tvShowList,
        isMainShown: true,
      });
    })
  }

  handleChange = () => {
    this.setState({ isMainShown: !this.state.isMainShown })
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Loading />
        ) : (
            <>
              <div>
                <div className="header">
                  <div className="wrapper">
                    <a href='./'><h1>TV SHOW</h1></a>
                    <div className="menuTrigger" onClick={this.handleChange}>
                      <i className="fa fa-search " />
                    </div>
                  </div>
                </div>
              </div>
              {this.state.isMainShown ?
                <>
                  <Main mainTvShow={this.state.mainTvShow} />
                  <div>
                    <TvShowList showList={this.state.tvShowList}></TvShowList>
                  </div></> : <Search />
              }
            </>
          )}
      </>
    );
  }
}

export default App;
