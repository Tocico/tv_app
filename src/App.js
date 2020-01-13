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
      error: ''
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
        error: ''
      });
    }).catch(error => {
      this.setState({ error: error.message })
    })
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Loading />
        ) : this.state.error ? <p className="error">{this.state.error}</p> : (
          <>
            <Navbar isMainShown={() => { this.setState({ isMainShown: !this.state.isMainShown }) }} />
            {this.state.isMainShown ?
              <>
                {this.state.mainTvShow ? <Main mainTvShow={this.state.mainTvShow} /> : ''}
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
