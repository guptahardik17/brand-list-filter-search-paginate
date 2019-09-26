import React, { Component } from 'react';
import paginate from 'paginate-array';

class Cards extends Component {
  constructor() {
    super()
    this.state = {
      jobsArray: [],
      jobs: null,
      companyname: '',
      skills: '',
      experience: '',
      location: '',
      message: '',
      isLoading: true,
      size: 20,
      page: 1
    }
    this.jobsInit = [];
    this.filterJobs = this.filterJobs.bind(this);

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);

  }

  componentDidMount() {
    fetch('https://nut-case.s3.amazonaws.com/jobs.json', {
      mode: 'cors',
      method: 'GET'
    })
    .then((response) => {
      response.json().then((result)=>{
        this.jobsInit = result.data;
        this.setState({ jobsArray: result.data, jobs: paginate(result.data, this.state.page, this.state.size) ,isLoading: false})
      })
    })
    .catch(
      error => console.log(error)
    )
  }

  previousPage() {
    const stateArr = this.state;

    if (stateArr.page > 1) {
      const newPage = stateArr.page - 1;
      const newCurrPage = paginate(stateArr.jobsArray, newPage, stateArr.size);

      this.setState({
        page: newPage,
        jobs: newCurrPage
      });
    }
  }

  nextPage() {
    const stateArr = this.state;
    
    if (stateArr.page < stateArr.jobs.totalPages) {
      const newPage = stateArr.page + 1;
      const newCurrPage = paginate(stateArr.jobsArray, newPage, stateArr.size);
      this.setState({ page: newPage, jobs: newCurrPage });
    }
  }

  filterJobs = param => e =>
  { 
    // Filtering data from full job list
    var updatedList =  this.jobsInit;
    
    // Filter Based on company name
    if(this.state.companyname.length > 0 || (param === 'companyname' && e.target.value.length > 0)){
      updatedList = updatedList.filter((item => {
        return item['companyname'].toLowerCase().search(
          (param === 'companyname' ? e.target.value : this.state.companyname).toLowerCase()) !== -1;
      }));
    }

    // Filter Based on skills
    if(this.state.skills.length > 0 || (param === 'skills' && e.target.value.length > 0)){
      updatedList = updatedList.filter((item => {
        return item['skills'].toLowerCase().search(
          (param === 'skills' ? e.target.value : this.state.skills).toLowerCase()) !== -1;
      }));
    }

    // if(this.state.experience.length > 0){
    //   updatedList = updatedList.filter((item => {
    //     return item['experience'].toLowerCase().search(
    //       (param === 'experience' ? e.target.value : this.state.experience).toLowerCase()) !== -1;
    //   }));
    // }

    
    // Filter Based on experience
    if(this.state.experience.length > 0 || (param === 'experience' && e.target.value.length > 0)){
      console.log();
      
      var val_to_com = (param === 'experience' ? (e.target.value.length === 0 ? -1 : Number(e.target.value)) : (this.state.experience.length === 0 ? -1 : Number(this.state.experience)));
      console.log(val_to_com);
      
      if(val_to_com !== -1){
        console.log("GETTING INSIDE");
        
        updatedList = updatedList.filter((item => {
          var s;
          if(item['experience'] === 'Fresher'){
            s = [0]
          }
          else{
            var str = item['experience'].match(/\d+/g, "")+'';
            s = str.split(',');
          }
          
          if(!(s[0] === "null")){
            console.log(
              s[0],
              val_to_com,
              s[1]
            );
            
            if( (s.length === 1 && val_to_com === Number(s[0]))
              || (s.length === 2 && Number(s[0]) <= val_to_com && val_to_com <= Number(s[1]))){
                return item;
            }
          }
        }));      
      } else{
        e.target.value = '';
      }
    }

    // Filter Based on Location
    if(this.state.location.length > 0 || (param === 'location' && e.target.value.length > 0)){
      updatedList = updatedList.filter((item => {
        return item['location'].toLowerCase().search(
          (param === 'location' ? e.target.value : this.state.location).toLowerCase()) !== -1;
      }));
    }
        
    if (updatedList.length === 0 ) {
      this.setState({
        jobsArray: updatedList,
        jobs: paginate(updatedList, this.state.page, this.state.size),
        [param]: e.target.value,
        message: true
      });
    } else {
      this.setState({
        jobsArray: updatedList,
        jobs: paginate(updatedList, this.state.page, this.state.size),
        [param]: e.target.value,
        message: false,
      });
    }

  }


  render() {
    const divStyleMain = {
      margin: '3% 5% 5% 5%'
    };

    const divStyleCard = {
      margin: '10px 0 10px 0'
    };

    const inputStyle = {
      margin: '20px 0 0 0',
      width: '100%',
      textAlign:'center'
    };  

    const colorGray = {
      color: 'gray'
    };  

  return (
    <div>
      
      <div className="container">
        <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <center>
                <input type="text"
                  className="center-block"
                  placeholder="Search By Company Name"
                  onChange={this.filterJobs("companyname")}
                  style={inputStyle}
                />
              </center>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <center>
                <input type="text"
                  className="center-block"
                  placeholder="Search By Skills"
                  onChange={this.filterJobs("skills")}
                  style={inputStyle}
                />
              </center>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <center>
                <input type="text"
                  className="center-block"
                  placeholder="Search By Experience"
                  onChange={this.filterJobs("experience")}
                  style={inputStyle}
                />
              </center>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <center>
                <input type="text"
                  className="center-block"
                  placeholder="Search By Location"
                  onChange={this.filterJobs("location")}
                  style={inputStyle}
                />
              </center>
            </div>
          </div>
        </div>

      <br />
      
      {this.state.isLoading ? <center><h5> Loading ... </h5></center> : (
        <div className="container">
          <center><h5>Total {this.state.jobsArray.length} of {this.jobsInit.length} Found</h5></center>
          <br />
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div class="d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-info" onClick={this.previousPage}>Previous</button>
                <button type="button" class="btn btn-light" disabled> {this.state.page} </button>
                <button type="button" class="btn btn-info" onClick={this.nextPage}>Next Page</button>
              </div>
            </div>
          </div>
        </div>
      )}

        { this.state.message ? <center><h5 style={colorGray}> No Records Found </h5></center> : (
        
        <div className="card-group" style={divStyleMain}>

        {this.state.jobs && this.state.jobs.data.map((i,index) => {
          return(
            <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="card" style={divStyleCard}>
                <img className="card-img-top" src="./images/download.png" alt="247 x 180 Size" />
                <div className="card-body">
                  <h5 className="card-title">{i['companyname']}</h5>
                  <p className="card-text">{i['title']}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Experience: {i['experience']}</li>
                  <li className="list-group-item">Skills: {i['skills']}</li>
                  <li className="list-group-item">Location: {i['location']}</li>
                </ul>
                <div className="card-body">
                  <a href={i['applylink']} className="card-link" target="_blank" rel="noopener noreferrer">Apply Now</a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      )}
    </div>
  );
  }
}

export default Cards;
