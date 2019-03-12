import React, { Component } from 'react';
import channels from '../file/channels.json'

class Cards extends Component {
  constructor() {
    super()
    console.log("SBSE PHELE");

    this.state = {
      channelsinit: channels.results,
      channels: {},
      results: {}
    }
    console.log("STATEs");
    this.filterChannels = this.filterChannels.bind(this);

  }

  // componentDidMount(){
  //   fetch('http://localhost:5000/', {
  //     mode: 'cors',
  //     method: 'GET'
  //   })
  //   .then((response) => {
  //     console.log("FUNCTION");
  //     console.log(response);
  //     response.json().then((result)=>this.setState({ results: result.results }))
  //   })
  //   .catch(
  //     error => console.log(error)
  //   )
  //   console.log("DID MOUNT");
  //   this.setState({
  //     channels: this.state.channelsinit
  //   })
  // }

  componentWillMount() {

    fetch('http://localhost:5000/', {
      mode: 'cors',
      method: 'GET'
    })
    .then((response) => {
      console.log("FUNCTION");
      console.log(response);
      response.json().then((result)=>this.setState({ results: result.results }))
    })
    .catch(
      error => console.log(error)
    )

    console.log("WILL MOUNT");
    this.setState({
      channels: this.state.channelsinit
    })
  }


  filterChannels(e)
  {
     var updatedList = this.state.channelsinit;
    updatedList = updatedList.filter((item =>{
      return item['Channel name'].toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    }) );
       this.setState({
      channels: updatedList
    });
    if (updatedList === 0 ) {
      this.setState({
      message: true,
    });
    } else {
      this.setState({
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
    margin: '20px 0 0 0'
  };
  console.log("RENDER");
  console.log(this.state.results);
  console.log(this.state.channels);
    return (
      <div>
        <center>
          <input type="text"
           className="center-block"
           placeholder="Search..."
           onChange={this.filterChannels}
           style={inputStyle}
           />
         </center>
        <div className="card-group" style={divStyleMain}>

        {this.state.channels.map((i,index) => {
                return(
                  <div className="col-sm-4 col-md-4 col-lg-3" key={index}>
                    <div className="card" style={divStyleCard}>
                      <img className="card-img-top" src="./images/download.png" alt="247 x 180 Size"/>
                      <div className="card-body">
                        <h5 className="card-title">{i['Channel name']}</h5>
                        <small className="text-muted">{i.Subscribers} Subscribers & {i["Video views"]} Views</small>
                        <p className="card-text">description description description description...</p>

                      </div>
                      <div className="card-footer">
                        <small className="text-muted">{i["Video Uploads"]} Videos</small>
                      </div>
                    </div>
                  </div>
                )
              })}


        </div>
      </div>
    );
  }
}

export default Cards;
