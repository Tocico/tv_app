import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import { searchTvShow } from "../../server/api";
import Results from './Results'


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      focus: false,
      result: [],
      error: null
    };
  }

  handleChange = e => {
    this.setState({
      searchWord: e.target.value,
      focus: true
    });
    let searchWord = e.target.value.toLowerCase();
    if (searchWord.length > 0 && searchWord !== "" && searchWord !== " ") {
      searchTvShow(searchWord)
        .then(response => {
          console.log(response.searchTvShow === 'no show')
          this.setState({
            focus: true,
            error: response.searchTvShow === 'no show' ? `We can not find ${this.state.searchWord}` : '',
            result: response.searchTvShow === 'no show' ? [] : response.searchTvShow
          });
        })
    }
    else {
      this.setState({
        result: []
      });
    }
  };

  focusElement = e => {
    this.setState({ focus: true });
    if (this.state.searchWord.length === 0) {
      this.clearSearch();
      this.setState({ focus: false });
    }
  };

  clearSearch = () => {
    this.setState({
      searchWord: " ",
      result: [],
      error: null,
      focus: false
    });
  };

  render() {
    return (
      <>
        <div className="search-input">
          <FormControl
            ref={node => (this.node = node)}
            value={this.state.searchWord}
            type="text"
            placeholder="Search..."
            onChange={this.handleChange}
            onMouseDown={this.focusElement}
          />
          {this.state.focus ? (
            <i
              className="fas fa-times"
              onMouseDown={() => this.clearSearch()}
            />
          ) : ''}
        </div>
        {this.state.error ? <div className="errorMsg"><div>{this.state.error}</div><div>Please make sure what you're looking for is a tv show</div></div> :
          <Results result={this.state.result} />
        }
      </>
    );
  }
}
