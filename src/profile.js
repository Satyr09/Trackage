import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../public/profilestyle.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Header from './components/Header.js';



class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state={user:'',email:'',id:'',taskList:[],completeList:[]};
    }

    getSessionInfo(){


        fetch('/api/sessionInfo',{credentials:'include'})
        .then(response=>response.json())
        .then(data=>{console.log('IDDDDDDD!!!' + data.id);this.setState({user:data.name,id:data.id});return data.id})
        .then(id=>{
            console.log("ANOTHER ID !!!"+id);
            fetch('/api/getUserInfo',{
                mode: 'cors',
                credentials:'include',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'post' ,credentials:'include' , body: JSON.stringify({id:id})})
                .then(res=>{console.log(res);return res.json()})
                .then(response=>{console.log(response);this.setState({organisation:response.organsiation , age:response.age , location:response.location , gender:response.gender }, ()=>{this.getTasks();this.getComplete()})})
        


        })
        

    }

    getTasks=()=>{

        console.log(this.state);
        console.log('TESTING STATE');
        fetch('/api/getUserTasks',{
            method:'post',
            mode:'cors',
            credentials:'include',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({user:this.state.user,id:this.state.id})
        })
        .then(res=>res.json())
        .then(data=>{console.log('HERE!');this.setTaskData(data)})
    }


    getComplete=()=>{
        
                console.log(this.state);
                console.log('TESTING STATE');
                fetch('/api/getUserCompleted',{
                    method:'post',
                    mode:'cors',
                    credentials:'include',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({user:this.state.user,id:this.state.id})
                })
                .then(res=>res.json())
                .then(data=>{console.log('HERE!');this.setCompleteData(data)})
            }

        setCompleteData(data){
                let tempArr=[];
                console.log('THE DATA HERE COMPLETE '+data);
        
                data.forEach(item=>{
                    item.subtasks.forEach(subtask=>{
        
                        if(subtask.completedBy==this.state.user)
                            tempArr.push({name:subtask.name,priority:subtask.priority,completedOn:subtask.completedOn});
        
                    })
                    
                })
                console.log(tempArr);
                this.setState({completeList:tempArr});
            }

    setTaskData(data){
        let tempArr=[];
        console.log('THE DATA HERE '+data);

        data.forEach(item=>{
            item.subtasks.forEach(subtask=>{

                if(subtask.assignedto==this.state.user)
                    tempArr.push({name:subtask.name,priority:subtask.priority});

            })
            
        })
        console.log(tempArr);
        this.setState({taskList:tempArr});
    }
    componentWillMount(){
        console.log('HI');
        


    }
    componentDidMount(){

        this.getSessionInfo();
        
        console.log('hi');
        this.getTasks();
    }


    render(){

        return(
            <div>
            <Header user={this.state.user}/>
            <div className="container spaceTopSmall">
                <div id="user-profile-2" className="user-profile">
                <div className="tabbable">
                    
        
                    <div className="tab-content no-border padding-24">
                        <div id="home" className="tab-pane in active">
                            <div className="row">
                                <div className="col-xs-12 col-sm-4 center">
                                    <span className="">
                                    <img className="img-responsive" src="http://amplifiii.com/flatso/wp-content/uploads/2013/09/flat-faces-icons-circle-man-4_256x256x32.png"></img>
                                    </span>
                                    <br></br>
                                    <br></br>
                                    <div className="space space-4"></div>
        
                                    <h3>
                                    <i className="fas fa-building"></i>                    
                                                        <span>   </span>
                                        <span className="bigger-110">  Organisation: JU ECell</span>
                                    </h3>
        
                                </div>
        
                                <div className="col-xs-12 col-sm-8">
                                    <h4 className="blue">
                                        <span className="middle">{this.state.user}</span>
        
                                    </h4>
        
                                    <div className="profile-user-info">
                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Username </div>
        
                                            <div className="profile-info-value">
                                                <span>{this.state.user}</span>
                                            </div>
                                        </div>
        
                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Location </div>
        
                                            <div className="profile-info-value"><i class="fas fa-location-arrow"></i>
                                            
                                            
                                                <span> {this.state.location}</span>
                                            </div>
                                        </div>
        
                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Age </div>
        
                                            <div className="profile-info-value">
                                                <span>{this.state.age}</span>
                                            </div>
                                        </div>
        
                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Gender </div>
        
                                            <div className="profile-info-value">
                                                <span>{this.state.gender}</span>
                                            </div>
                                        </div>
        
                                    </div>
        
                                    <div className="hr hr-8 dotted"></div>
        
                                    <div className="profile-user-info">
                                 
        
                                        <div className="profile-info-row">
                                            <div className="profile-info-name">
                                            <i class="fab fa-facebook"></i>
                                            
                                             </div>
        
                                            <div className="profile-info-value">
                                                <a href="#">Facebook</a>
                                            </div>
                                        </div>
        
                                        <div className="profile-info-row">
                                            <div className="profile-info-name">
                                            <i class="fab fa-linkedin"></i>


                                            </div>
        
                                            <div className="profile-info-value">
                                                <a href="#">Linkedin</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div className="row spaceTop">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="widget-box transparent">
                                        <div className="widget-header widget-header-small">
                                            <h4 className="widget-title smaller">
                                                <i className="ace-icon fa fa-check-square-o bigger-110"></i>
                                                Tasks you have been assigned:
                                            </h4>
                                        </div>
        
                                        <div className="widget-body">
                                            <div className="widget-main">
                                                <ul>
                                                    {this.state.taskList.map(item=>{
                                                        return <li>Name : {item.name} {item.priority?<span style={{backgroundColor:'yellow'}} className="badge smallBackground"><strong>High priority</strong></span>:<span></span>}</li>
                                                    })}
                                                    </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="widget-box transparent">
                                        <div className="widget-header widget-header-small">
                                            <h4 className="widget-title smaller">
                                                <i className="ace-icon fa fa-check-square-o bigger-110"></i>
                                                Tasks you have completed:
                                            </h4>
                                        </div>
        
                                        <div className="widget-body">
                                            <div className="widget-main">
                                            <ul>
                                            {this.state.completeList.map(item=>{
                                                return <li>Name : {item.name} {item.priority?<span style={{backgroundColor:'yellow'}}
                                                 className="badge smallBackground"><strong>High priority</strong></span>:<span></span>}
                                                  <p style={{fontSize:'14px',color:'grey'}}>Completed on : {item.completedOn}</p></li>
                                            })}
                                            </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        
                </div>
            </div>


            </div>
            </div>
            </div>



        )


    }


}

class Assigned extends React.Component{
    render(){
        return(
            <div><h1>Assigned tasks' details:</h1></div>
        )
    }
}
class Given extends React.Component{
    render(){
        return(
            <div><h1>Given tasks' details:</h1></div>
        )
    }
}
class Awards extends React.Component{
    render(){
        return(
            <div><h1>Awards received details:</h1></div>
        )
    }
}
 
ReactDOM.render(
  <div>  
  <Profile/>
    <Router>
        <div>
        <Route exact path="/profile" component={Assigned}/>

                    <Route exact path="/profile/assigned" component={Assigned}/>
                    <Route exact path="/profile/given" component={Given}/>
                    <Route exact path="/profile/awards" component={Awards}/>
         </div>
    </Router>
  </div>,
  document.getElementById('root')


);