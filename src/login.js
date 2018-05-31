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


        let Passelem=document.getElementById('password');
        let password=Passelem.value;
        Passelem.value='';


        if(username && password){
        fetch('/api/login', {
         method: 'post',
          mode: 'cors',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         credentials: 'include',
          body: JSON.stringify({'username':username,'password':password}),

        })
        .then(response=>{console.log('Here!' + response.url);window.location.href=response.url})
        }


        else{
            console.log("Username and Password can not be empty");
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
                      <h4 className='text-center'>Login</h4>
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
                  <input id="submitButton" type="submit"></input>
                </form>
            </div>
            </div>


            /*<form onSubmit={e=>this.handleSubmit(e)}>
             <input id="username" name="username" placeholder="Username"></input>
             <input id="password" name="password" type="password" placeholder="Password"></input>
             <button className="btn btn-success leftSpace" type="submit">Login</button>

            </form> */           



        )
    }


}









ReactDOM.render(
  <App/>,
  document.getElementById('root')


);
