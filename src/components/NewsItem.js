import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div>
        <div>
        <div className="card" style={{"width": "18rem"}}>
        <img src={imageUrl} className="card-img-top" alt="..." style={{"maxHeight": "150px"}} />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a target="_blank" rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
        </div>
      </div>
    )
  }
}
