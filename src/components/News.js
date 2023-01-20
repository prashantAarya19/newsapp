import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles : [],
            loading : false
        }
    }   
    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?apiKey=16cd5faed846427f85787fa351416a2d&country=in';
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log('parsed data : '+parsedData.articles);
        this.setState({articles : parsedData.articles});
    }

  render() {
        return (
        <div>
            <div className="container my-4 mx-4">
                <h3>NewsGoblin - Top Headlines</h3>
                <div className="row">
                    {this.state.articles.map((elm) => {
                        return <div className="col-md-3" key={elm.url}>
                                    <NewsItem title = {elm.title ? elm.title.slice(15): ""} description= {elm.description ? elm.description.slice(0, 110) : ""} imageUrl= {elm.urlToImage ? elm.urlToImage : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} newsUrl = {elm.url}/>
                                </div>
                    })};
                </div>
            </div>
        </div>
        )
    }
}
