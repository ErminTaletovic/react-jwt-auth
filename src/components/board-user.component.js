import React, { Component } from "react";
import ProductDataService from "../services/product.service";

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveProducts() {
    ProductDataService.getAll()
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProducts();
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }

  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index
    });
  }

  searchTitle() {
    ProductDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, products, currentProduct, currentIndex } = this.state;

    return (
      <>
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-3">Korisnička stranica!</h1>
          <p>Sadžaj korisnika. Podatci koje korisnik prikupi iz baze koristeći NodeJS i Express na MS SQL bazi!</p>
        </div>
      </div>
        <div className="list row">
          <div className="col-md-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle} />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="list row">
          <div className="col-md-12">
            <h4>Products</h4>
          </div>
        </div>

        <div className="list row">
          <div className="col-md-2">
            <ul className="list-group">
              {products &&
                products.map((product, index) => (
                  <li
                    className={"list-group-item " +
                      (index === currentIndex ? "active" : "")}
                    onClick={() => this.setActiveProduct(product, index)}
                    key={index}
                  >
                    {product.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-group">
              {products &&
                products.map((product, index) => (
                  <li
                    className={"list-group-item " +
                      (index === currentIndex ? "active" : "")}
                    onClick={() => this.setActiveProduct(product, index)}
                    key={index}
                  >
                    {product.description}
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-md-4">
            {currentProduct ? (
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentProduct.published ? "Published" : "Pending"}
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Product...</p>
              </div>
            )}
          </div>
        </div >
      </>
    );
  }
}