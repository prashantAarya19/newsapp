import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles : [],
            loading : false,
            page: 1,
            pageSize: 6,
            totalArticles: 0
        }
    }   
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?apiKey=16cd5faed846427f85787fa351416a2d&country=in&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles, 
            totalArticles: parsedData.totalResults
        });
    }

    handlePrev = async() => {
        console.log("Prev");
        if(this.state.page - 1 > 0) {
            let url = `https://newsapi.org/v2/top-headlines?apiKey=16cd5faed846427f85787fa351416a2d&country=in&page=${this.state.page - 1}&pageSize=${this.state.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles : parsedData.articles, 
                totalArticles: parsedData.totalResults,
                page : this.state.page - 1
            });
        }
    }

    handleNext = async() => {
        console.log("Next");
        if(this.state.page + 1 < Math.ceil(this.state.totalArticles/this.state.pageSize)) {
            let url = `https://newsapi.org/v2/top-headlines?apiKey=16cd5faed846427f85787fa351416a2d&country=in&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles : parsedData.articles, 
                totalArticles: parsedData.totalResults,
                page : this.state.page + 1
            });
        }
    }

  render() {
        return (
        <div>
            <div className="container my-4">
                <h3>NewsGoblin - Top Headlines</h3>
                <div className="row">
                    {this.state.articles.map((elm) => {
                        return <div className="col-md-3 mx-4 my-4" key={elm.url}>
                                    <NewsItem title = {elm.title ? elm.title.slice(15): ""} description= {elm.description ? elm.description.slice(0, 110) : ""} imageUrl= {elm.urlToImage ? elm.urlToImage : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} newsUrl = {elm.url}/>
                                </div>
                    })};
                </div>
            </div>
            <div className="container d-flex justify-content-between my-4">
                <button type="button" disabled= {this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Prev</button>
                <button type="button" disabled= {this.state.page + 1 > Math.ceil(this.state.totalArticles/this.state.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
            </div>
        </div>
        )
    }
}
