import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class VideoList extends Component {
  render() {
    const videoList = this.props.data;
    return (
      <div>
        <Row>
          {videoList.map((video, id) => (
            <Col sm key={id}>
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={video.image.medium} />
                <Card.Body>
                  <Card.Title>{video.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
