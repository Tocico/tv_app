import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import { searchTvShow } from "../../data/index";
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
          this.setState({
            focus: true,
            error: "",
            result: response.searchTvShow
          });
          console.log(!response.searchTvShow)
        })
        .catch(error => {
          console.log(!error)
          this.setState({
            error: `We can not find ${this.state.searchWord}`
          })
        });
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
    console.log(this.state.error)
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
            <Results result={this.state.result} /> 
      </>
    );
  }
}
