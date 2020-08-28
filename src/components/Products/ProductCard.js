import React, { Component } from 'react';
import Avatar from 'react-avatar';

class ProductCard extends Component {
//   constructor() {
//     super()
//   }

  render() {
    const {brand, country, stars, style, topTen, variety} = this.props;
  
    return (
        <div className="col-md-4" style={{marginTop: '20px'}}>
            <div className="card">
                <div className="icon-wrap px-4 pt-4">
                    <div className="icon d-flex justify-content-center align-items-center rounded-circle">
                        <Avatar name={brand} round={true} color={'#17a2b8'}/>
                    </div>
                </div>

                <div className="card-body pb-5 px-4">
                    <h5 className="card-title">{brand}</h5>
                    <div className="card-subtitle" style={{height: '50px'}}>{variety}</div>                    
                    {/* <a href="http://localhost:3000" className="btn btn-info">Go somewhere</a> */}
                </div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Rank: {topTen.split(' ')[1]}</li>
                    <li className="list-group-item">Year: {topTen.split(' ')[0]}</li>
                    <li className="list-group-item">Style: {style}</li>
                    <li className="list-group-item">Country: {country}</li>
                    <li className="list-group-item">Ratings: {stars} </li>
                </ul>
            </div>
        </div>                            
    );
  }
}

export default ProductCard;
