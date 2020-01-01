import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import { getVideo } from "../../data/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "../background/Image";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { search } from "./actions";

// import { search} from './actions';

// function search(word, props) {
//   const videoSearch = props.videoList;
//   videoSearch.map(e=> console.log(e.name))
//   const searchWord = word.toLowerCase();

//   if (searchWord.length > 0 && searchWord !== "" && searchWord !== " ") {
//     // let results = videoSearch.map(title => {
//     //   const name = title.name.toLowerCase();
//     //   console.log(name.includes(searchWord))
//     //   return name.includes(searchWord);
//     // });
//     // return results;
//   }else{
//       return [];
//   }
// }

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      focus: false,
      title: [],
      image: [],
      summary: [],
      episodes: [],
      error: [],
      list: []
    };
  }

  componentDidMount() {
    this.setState({
      image: this.props.image
    });
  }

  handleChange = e => {
    this.setState({
      searchWord: e.target.value,
      focus: true
    });
    let searchWord = e.target.value.toLowerCase();
    if (searchWord.length > 0 && searchWord !== "" && searchWord !== " ") {
      getVideo(searchWord)
        .then(response => {
          this.setState({
            focus: true,
            error: "",
            title: response.name,
            image: response.image.original,
            summary: response.summary,
            episodes: response._embedded.episodes.map(episode => episode)
          });
        })
        .catch(error =>{
          console.log(error)
          this.setState({
            error: `We cant not find ${this.state.searchWord}`,
            title: "",
            summary: "",
            episodes: ""
          })
        });
    } else {
      return [];
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
      title: " ",
      summary: " ",
      episodes: " ",
      error: " ",
      focus: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container className="container">
          <Row className="row">
            <Col className="col">
              <Image image={this.state.image} />
            </Col>
            <Col className="col">
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
                ) : (
                  <i className="fa fa-search " />
                )}
                <Button variant="primary" className="searchBtn" type="submit">
                  Submit
                </Button>
              </div>
              {this.state.error ? (
                <div>{this.state.error}</div>
              ) : (
                <div>
                  <div>{this.state.title}</div>
                  <div
                    dangerouslySetInnerHTML={{ __html: this.state.summary }}
                  ></div>
                  <div>
                    <ul>

                   
                    </ul>
                    </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
        {/* {this.state.list.map((item, index)=>
              <Results 
                  key={index}
                  item= {item}
                  showObjectInformation={this.props.showObjectInformation}
              />
              )
              } */}
      </React.Fragment>
    );
  }
}
