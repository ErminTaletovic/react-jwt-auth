import React, { Component } from "react";

import UserService from "../services/user.service";


export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getModeratorBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

      }
    );
  }

  render() {
    return (
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-3">Moderatorska stranica!</h1>
          <p>Sadžaj moderatorske stranice mogu vidjet samo korisnici sa moderatorskim pravima.</p>
        </div>
      </div>
    );
  }
}