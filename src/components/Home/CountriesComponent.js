import React from 'react';  
import Avatar from 'react-avatar';
import {
    Link,
  } from "react-router-dom";

function CountriesComponent(props) {

    return (
        <div className="col-md-4" style={{marginTop: '20px'}}>
            <div className="card text-center">
                <div className="icon-wrap px-4 pt-4">
                    <div className="icon d-flex justify-content-center align-items-center rounded-circle">
                        <Avatar name={props.country} round={true} color={'#17a2b8'}/>
                    </div>
                </div>    
                <div className="card-header" style={{marginTop: '20px'}}>
                    <h5 className="card-title">{props.country}</h5>
                </div>
                <div className="card-header">
                    <h5 className="card-title">
                        <Link to={`/${props.country}/products`}>View Products</Link>
                    </h5>
                </div>
            </div>
        </div>   
    ) 

} 

export default CountriesComponent;