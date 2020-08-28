import React, { Component } from 'react';
import CountriesComponent from './CountriesComponent';
import axios from 'axios';

class HomeComponent extends Component {
  constructor() {
    super()
    this.state = {
      brandsArray: [],
      allCountries: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    axios.get('http://starlord.hackerearth.com/TopRamen')
    .then((response) => {
      this.brandsInit = response.data;
      localStorage.setItem('allBrands', JSON.stringify(response.data));

      const countries = [];
      response.data.forEach(data => {
        if(countries.indexOf(data.Country) === -1){
          countries.push(data.Country)
        }
      });

      this.setState({ brandsArray: response.data, allCountries: countries})
    })
    .catch(
      error => console.log(error)
    )
  }

  render() {
    const divStyleMain = {
      margin: '3% 5% 5% 5%'
    };

    const colorGray = {
      color: 'gray'
    };  

  return (
    <div>
        <div className="card-group" style={divStyleMain}>
          <div className="container">
            <section className="ftco-section bg-light" id="cards">
              <div className="container card-styles">
                <div className="row">
                  {this.state.allCountries && this.state.allCountries.map((i,index) => {
                    return( 
                      <CountriesComponent 
                        key={index} 
                        country={i}
                      /> 
                    )
                  })}
                </div>
              </div>
            </section>   
          </div>
        </div>
      )}
    </div>
  );
  }
}

export default HomeComponent;
