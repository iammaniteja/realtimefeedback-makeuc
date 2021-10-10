import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          published_surveys: []
        };
      }

      componentDidMount() {
        axios.get(`http://localhost:3000/survey`)
          .then(res => {
            const published_surveys = res.data;
            console.log(published_surveys);
            this.setState({ published_surveys });
          })
      }

    render() {
        return(
            <div className="container-fluid">
                <div className="actions mt-4">
                <a href="/survey" style={{color:"white", textDecoration:"none"}}><button className="btn btn-primary">Create</button></a>
                <hr></hr>
                </div>
                <div className="history">
                    <div className="preview">
                    {this.state.published_surveys.map((item, i) => {
                       return  <div key={i} className="card mt-4">
                       <div className="card-body">
                           <div className="card-title">
                               <div style={{fontSize: "1.2em", fontWeight: "bold"}}>{item.name}<span style={{float : "right", fontSize:"0.7 em" ,fontWeight:"normal"}}>Created : <Moment format="YYYY/MM/DD">{item.createdAt}</Moment></span></div>
                               
                            </div>
                           <h6 className="card-subtitle mb-2 text-muted">{item.description}</h6>
                           {/* <p className="card-text"></p> */}
                           <a href="#" className="card-link">Survey link</a>
                       </div>
                   </div>
                    })}
                    </div>
                </div>
                <div>
                </div>
            </div>
            
        );
      }
}