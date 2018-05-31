import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


export default class Header  extends React.Component{

constructor(props){

    super(props);
    this.state={user:this.props.user};

}



render(){
    
    console.log(this.props.user +" " + this.state.user);
    
    return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark borderShadowBottom">
  <a className="navbar-brand" href="#">Logo</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
        <a className="nav-link" href="/profile">{this.props.user}'s Profile</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">Project Dashboard</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Employee Directory</a>
      </li>
    </ul>
    <span className="navbar-text logoutLink">
     <a className="nav-link" href="/logout"><i className="fas fa-sign-out-alt"></i> Logout</a>
    </span>
  </div>
</nav>



    )



}

}