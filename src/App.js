import React, { Component } from "react";
import Loading from "./components/loading/Loading";
import { load} from "./data/index";
// import VideoList from "./components/list/VideoList";
import Search from "./components/search/Search";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      videos: [],
      image: []
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { videoList, image } = await load();
    this.setState({
      isLoading: false,
      videos: videoList,
      image: image
    });
  }
 

  
  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <Search image={this.state.image}/>        
        )}
      </React.Fragment>
    );
  }
}

export default App;
