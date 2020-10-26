import React, { Component } from "react";

export default class TweetBox extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.text}</h3>
      </div>
    );
  }
}
