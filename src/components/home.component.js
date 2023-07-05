import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
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
          <h1 class="display-3">Poečetna stranica!</h1>
          <p>Sadržaj početne stranice koju svi mogu vidjet.</p>
        </div>
      </div>

    );
  }
}