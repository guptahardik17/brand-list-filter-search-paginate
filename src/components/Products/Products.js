import React, { Component } from 'react';
import paginate from 'paginate-array';
import ProductCard from './ProductCard';

class Products extends Component {
  constructor() {
    super()
    this.state = {
      brandsInit: [],
      brandsArray: [],
      brands: null,
      message: '',
      brandName: '',
      isLoading: true,
      size: 20,
      page: 1
    }

    this.filterJobs = this.filterJobs.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);

    this.sortJobs = this.sortJobs.bind(this);
  }

  componentDidMount() {    
    this.filterBrandsByCountry();
  }

  filterBrandsByCountry(){
    const allBrands = JSON.parse(localStorage.getItem('allBrands'));

    // Filtering data by Country
    var updatedList =  allBrands;
    updatedList = updatedList.filter((item => {
      return item.Country === this.props.match.params.country;
    }));

    if (updatedList.length === 0 ) {
      this.setState({
        brandsInit: updatedList,
        brandsArray: updatedList,
        brands: paginate(updatedList, this.state.page, this.state.size),
        message: true,
        isLoading: false
      });
    } else {
      this.setState({
        brandsInit: updatedList,
        brandsArray: updatedList,
        brands: paginate(updatedList, this.state.page, this.state.size),
        message: false,
        isLoading: false
      });
    }
  }

  previousPage() {
    const stateArr = this.state;

    if (stateArr.page > 1) {
      const newPage = stateArr.page - 1;
      const newCurrPage = paginate(stateArr.brandsArray, newPage, stateArr.size);

      this.setState({
        page: newPage,
        brands: newCurrPage
      });
    }
  }

  nextPage() {
    const stateArr = this.state;
    
    if (stateArr.page < stateArr.brands.totalPages) {
      const newPage = stateArr.page + 1;
      const newCurrPage = paginate(stateArr.brandsArray, newPage, stateArr.size);
      this.setState({ page: newPage, brands: newCurrPage });
    }
  }

  sortJobs = (order, key) => {

    // var updatedList = this.state.brandsArray.filter((item => { return item[key]!== 'NaN' }));
    var updatedList = this.state.brandsArray.sort((a, b) => {
      var yearA = a[key].split(' ')[0];
      var yearB = b[key].split(' ')[0];

      var rankA = a[key].split(' ')[1];
      var rankB = b[key].split(' ')[1];

      if(order === "ASC"){
        return rankA.localeCompare(rankB) || yearA.localeCompare(yearB);
      } else if(order === "DESC"){
        return yearB.localeCompare(yearA);
      }

      return null;
    });

    this.setState({
      brandsArray: updatedList,
      brands: paginate(updatedList, this.state.page, this.state.size)
    });
  }

  filterJobs = param => e =>
  { 
    var updatedList =  this.state.brandsInit;

    // Filter Based on company name
    if(this.state.brandName.length > 0 || (param === 'brandName' && e.target.value.length > 0)){
      updatedList = updatedList.filter((item => {
        return item.Brand.toLowerCase().search(
          (param === 'brandName' ? e.target.value : this.state.brandName).toLowerCase()) !== -1;
      }));
    }
        
    if (updatedList.length === 0 ) {
      this.setState({
        brandsArray: updatedList,
        brands: paginate(updatedList, this.state.page, this.state.size),
        [param]: e.target.value,
        message: true
      });
    } else {
      this.setState({
        brandsArray: updatedList,
        brands: paginate(updatedList, this.state.page, this.state.size),
        [param]: e.target.value,
        message: false,
      });
    }

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
      {this.state.isLoading ? <center><h5> Loading ... </h5></center> : (
      <div className="container">
        <div className="row" style={{marginTop: '20px'}}>
          <div className="col-sm-2 col-md-2 col-lg-2"></div>
          <div className="input-group md-form form-sm form-1 col-sm-6 col-md-6 col-lg-6"  style={{marginTop: '20px'}}>
            <div className="input-group-prepend">
              <span className="input-group-text" style={{backgroundColor: '#17a2b8'}}>
                <i className="fa fa-search text-white" aria-hidden="true"></i>
              </span>
            </div>
            <input className="form-control my-0 py-1" type="text" placeholder="Search By Brand" onChange={this.filterJobs("brandName")}/>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3">
            <center><button type="button" className="btn btn-info"  style={{marginTop: '20px'}} onClick={() => this.sortJobs("ASC","Top Ten")}>Sort By Top Ten</button></center>
          </div>
        </div>
        
          <center><br /><h5>Found {this.state.brandsArray.length} {this.state.brandsArray.length > 1 ? "Results" : "Result"}</h5></center>
          <br />
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="d-flex justify-content-center align-items-center">
                <button type="button" className="btn btn-info" onClick={this.previousPage}>Previous</button>
                <button type="button" className="btn btn-light" disabled> {this.state.page} </button>
                <button type="button" className="btn btn-info" onClick={this.nextPage}>Next Page</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {this.state.brands ? (this.state.brands.totalPages < this.state.page && this.state.brands.totalPages > 0 ? <center><br /><h5 style={colorGray}> Oops!! Go to page number 1, Jobs are less based on your search. </h5></center>: null) : null}

      { this.state.message ? <center><br /><h5 style={colorGray}> No Records Found </h5></center> : (
        <div className="card-group" style={divStyleMain}>
          <div className="container">
            <section className="ftco-section bg-light" id="cards">
              <div className="container card-styles">
                <div className="row">
                  {this.state.brands && this.state.brands.data.map((i,index) => {
                    return( 
                      <ProductCard 
                        key={index} 
                        brand={i.Brand} 
                        country={i.Country} 
                        stars={i.Stars} 
                        style={i.Style} 
                        topTen={i['Top Ten']} 
                        variety={i.Variety} 
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

export default Products;
