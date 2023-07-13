import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import TutorialDataService from "../services/tutorial.service";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }


  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (

      <>
        <div class="jumbotron">
          <div class="container">
            <h1 class="display-3">Poečetna stranica!</h1>
            <p>Sadržaj početne stranice koju svi mogu vidjet.</p>
          </div>
        </div>
        <div className="list row">
          <div className="col-md-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Pretraži turoriale"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Pretraga
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <h4>Početna stranica - Tutorials List</h4>

            <ul className="list-group">
              {tutorials &&
                tutorials.map((tutorial, index) => (
                  <li
                    className={"list-group-item " +
                      (index === currentIndex ? "active" : "")}
                    onClick={() => this.setActiveTutorial(tutorial, index)}
                    key={index}
                  >
                    {tutorial.title}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllTutorials}
            >
              Remove All
            </button>


            <a href="/add">
              <button
                className="m-3 btn btn-sm btn-warning"
              >
                Add New Tutorial
              </button>
            </a>

          </div>


          <div className="col-md-4">
            <h4>Tutorial details</h4>
            {currentTutorial ? (
              <div>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentTutorial.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentTutorial.description}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentTutorial.published ? "Published" : "Pending"}
                </div>
                <div>
                  <Link
                    target="_blank"
                    to={currentTutorial.description}
                    className="m-3 btn btn-sm btn-success"
                  >
                    Link to Tutorial
                  </Link>
                  <Link
                    to={"/tutorials/" + currentTutorial.id}
                    className="m-3 btn btn-sm btn-danger"
                  >
                    Edit Tutorial info
                  </Link>
                </div>

              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Tutorial for details...</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}