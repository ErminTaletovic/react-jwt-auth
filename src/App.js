import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
//Artikli
import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import ProductsList from "./components/products-list.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <a href="/" className="nav-item">
            <img
              src="https://www.datalab.ba/wp-content/uploads/2018/12/PANTHEON_logo_25years_web_dark-6.png"
              alt="profile-img"
              height="40"
            />
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"}
                className="navbar-brand">
                <div className="navbar-brand">
                  _API
                </div>
              </Link>
            </li>

            {showAdminBoard && (
              <>
                <li className="nav-item">
                  <Link to={"/admin"}
                    className="btn btn-light btn-sm">
                    Administrator
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/mod"}
                    className="btn btn-light btn-sm">
                    Moderator
                  </Link>
                </li>
              </>
            )}

            {showModeratorBoard && (
              <>
                <li className="nav-item">
                  <Link to={"/mod"}
                    className="btn btn-light btn-sm">
                    Moderator
                  </Link>
                </li>
              </>
            )}
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link to={"/User"}
                    className="btn btn-light btn-sm">
                    Korisnik
                  </Link>
                </li>
              </>
            )}
            
            </div>



            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"}
                    className="btn btn-light btn-sm">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login"
                    className="btn btn-danger active btn-sm"
                    onClick={this.logOut}>
                    Odjava
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"}
                    className="btn btn-light btn-sm" >
                    Prijava
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"}
                    className="btn btn-light btn-sm">
                    Registracija
                  </Link>
                </li>
              </div>
            )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorials" element={<TutorialsList />} />
            <Route path="/add" element={<AddTutorial />} />
            <Route path="/tutorials/:id" element={<Tutorial />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/Products/:id" element={<Product />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>

        <div>
          <footer class="page-footer font-small blue">
            <div class="footer-copyright text-center py-3">
              <a href="/" >
                Pantheon API
                © 2023 Copyright: Ermin Taletović
              </a>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;