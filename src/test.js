import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../public/login-style.css';



class App  extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
       
      }

      handleSubmit(e){
        let Userelem=document.getElementById('username');
        let username=Userelem.value;
        Userelem.value='';
        console.log(username);
        

        let Passelem=document.getElementById('password');
        let password=Passelem.value;
        Passelem.value='';
        console.log(password);

        let locationelem=document.getElementById('location');
        let location=locationelem.value;
        locationelem.value='';
        console.log(location);
        
        let ageelem=document.getElementById('age');
        let age=ageelem.value;
        ageelem.value='';        console.log(age);
        

        let orgelem=document.getElementById('org');
        let org=orgelem.value;
        orgelem.value='';
        console.log(org);
        
        let genderelem=document.getElementById('gender');
        let gender=genderelem.value;
        genderelem.value='';
        console.log(gender);
        
        console.log(username+ " "+ password+" "+age+" "+gender+" "+org+" "+location);

        if(username && username!='' && password && password!='' && gender  && gender!='' && age && age!='' && org  && org!='' && location && location!='' )
        {

          if(password.length<= 8 )
          {
            alert('Password should be greater than 8 characters in length');
          }
          else{
        fetch('/api/register/newregistration', {
         method: 'post',
          mode: 'cors',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
          body: JSON.stringify({username,password,location,age,gender,org}),

        })
            .then(response=>response.json())
            .then(data=>{console.log(data)})
            .catch(error=>console.error(error))
        }
        window.location.href='/login';
      }

        else{
            alert("Please fill out all the fields");
        }
        e.preventDefault();


      }



    render(){
        return(     
            
            <div className="wrapper">
            <div className="profile-pic">
             <img src="http://amplifiii.com/flatso/wp-content/uploads/2013/09/flat-faces-icons-circle-man-4_256x256x32.png"></img>
            </div>
            <div className='text-center ' style={{color:'white', marginTop:'15px'}}>
            <h4 className='text-center'>Register</h4>
            </div>
        <div className="signin">
            <form onSubmit={e=>this.handleSubmit(e)}>
              <div className="input-group">
                <input id="username" id="username" name="username"  type="text"></input>
                <label>Your Username</label>
              </div>
              <div className="input-group">
                <input id="password" name="password" type="password"></input>
                <label>Your Password</label>
              </div>
              <div className="input-group">
                <input id="location" name="location" type="text"></input>
                <label>Location</label>
              </div>
              <div className="input-group">
                <input id="age" name="age" type="text"></input>
                <label>Age</label>
              </div>
              <div className="input-group">
                <input id="gender" name="gender" type="text"></input>
                <label>Gender</label>
              </div>
              <div className="input-group">
                <input id="org" name="org" type="text"></input>
                <label>Organisation</label>
              </div>
              <input id="submitButton" type="submit"></input>
            </form>
        </div>
        </div>



        )
    }


}









ReactDOM.render(
  <App/>,
  document.getElementById('root')


);
