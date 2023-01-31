import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    pageSize: "5",
    country: "in",
    category: "general",
  };

  PropTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=16cd5faed846427f85787fa351416a2d&category=${this.props.category}&country=${this.props.country}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrev = async () => {
    if (this.state.page - 1 > 0) {
      this.setState({ loading: true });
      let url = `https://newsapi.org/v2/top-headlines?apiKey=16cd5faed846427f85787fa351416a2d&category=${
        this.props.category
      }&country=${this.props.country}&page=${this.state.page - 1}&pageSize=${
        this.props.pageSize
      }`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalArticles: parsedData.totalResults,
        page: this.state.page - 1,
        loading: false,
      });
    }
  };

  handleNext = async () => {
    if (
      this.state.page + 1 <
      Math.ceil(this.state.totalArticles / this.props.pageSize)
    ) {
      this.setState({ loading: true });
      let url = `https://newsapi.org/v2/top-headlines?apiKey=16cd5faed846427f85787fa351416a2d&category=${
        this.props.category
      }&country=${this.props.country}&page=${this.state.page + 1}&pageSize=${
        this.props.pageSize
      }`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalArticles: parsedData.totalResults,
        page: this.state.page + 1,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div>
        <div className="container my-4">
          <h3 className="d-flex justify-content-center">
            NewsGoblin - Top Headlines
          </h3>
          {this.state.loading && <Spinner />}
          <div className="row d-flex justify-content-center">
            {this.state.articles.map((elm) => {
              return (
                <div className="col-md-3 mx-4 my-4" key={elm.url}>
                  <NewsItem
                    title={elm.title ? elm.title.slice(15) : ""}
                    description={
                      elm.description ? elm.description.slice(0, 110) : ""
                    }
                    imageUrl={
                      elm.urlToImage
                        ? elm.urlToImage
                        : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    }
                    newsUrl={elm.url}
                  />
                </div>
              );
            })}
            ;
          </div>
        </div>
        <div className="container d-flex justify-content-between my-4">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrev}
          >
            &larr; Prev
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >=
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
