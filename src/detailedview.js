import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../public/style.css'
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Header from './components/Header.js';



class DetailedView extends React.Component{


    constructor(props){
        super(props);
        this.state={queryParams:'',id:'',data:{subtasks:[],comments:[]},user:'',sessionId:''};
    }



    completionHandler(e,id){
        fetch('/api/markCompleted',{
            method:'post',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({mainTaskId:this.state.data._id,subtaskId:id,currentComplete:this.state.data.noOfCompleted,completedBy:this.state.user})
        })
        .then(res=>res.json())
        .then(data=>{console.log(data);this.getTaskInfo();})
        .catch(error=>console.log(error))
    }



    getTaskInfo(){
        console.log('We came here');
        let queryParamsString=window.location.search.substr(1);
        const queryParams = queryParamsString.split('&').reduce((accumulator, singleQueryParam) => {
            const [key, value] = singleQueryParam.split('=');
            accumulator[key] = value;
            return accumulator;
          }, {});
          console.log(queryParams);
          this.setState({queryParams:queryParams,id:queryParams.id},this.taskData );
          

    }


    addComment=(e)=>{

        let commentValue= document.getElementById('commentBox').value;
        fetch('/api/submitComment',{
            method:'post',
            credentials:'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({commentValue,mainTaskId:this.state.data._id,commentBy:this.state.user})
            })
            .then(response=>response.json())
            .then(data=>{let tempArr=this.state.data.comments; tempArr.push(data);this.setState({comments:tempArr},()=>console.log(this.state))})
            .catch(error=>console.log(error))
        
        document.getElementById('commentBox').value='';
        e.preventDefault();
    }



    taskData=()=>{
        console.log(this.state.id);
        fetch('/api/taskData',{
            method:'post',
            credentials:'include',
            body:JSON.stringify({taskid:this.state.id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        })
        .then(response=>response.json())
        .then(data=>{console.log(data);this.setState({data:data});})
        .catch(error=>console.log(error))
    }






    getFakeComments(){
        fetch('https://jsonplaceholder.typicode.com/comments',{
        mode:'cors'}
        )
        .then(response=>response.json())
        .then(data=>{console.log('THEM DATA');this.setState({fakecomments:data},()=>{console.log('umm');console.log(this.state.fakecomments)})})
    }

    componentDidMount(){
        this.getTaskInfo();
        
        fetch('/api/sessionInfo',{credentials:'include'})
        .then(response=>response.json())
        .then(data=>{this.setState({user:data.name,sessionId:data.id});})

    }


render(){
    return(
       
        <div>
            <Header user={this.state.user}/>
            


            <div className="row">

                <div className="col-xs-12 col-md-6 borderRight smallLeftPadding">

                
                    <div className="spaceTop">
                    <div className="editOptions">
                        <span style={{float:'right',border:'1px solid #bfb9b9',padding:'6px',borderRadius:'3px'}}><i  className="far fa-edit editTask"></i> Edit</span>
                    </div>
                        <h4>{this.state.data.name}</h4>
                        <p className="smallText"><img src="http://amplifiii.com/flatso/wp-content/uploads/2013/09/flat-faces-icons-circle-man-4_256x256x32.png"
                             style={{height:'18px',width:'auto'}}></img> {this.state.data.createdBy} | {this.state.data.time}</p>


                        <p><strong>Assigned users : </strong><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs1Mtx-INbdQ5D3Xmsyq-D3HjpKmXnhKiqJsyzfNxzJ8gx-ewB"
                             style={{height:'18px',width:'auto'}}></img> Daipayan</p>


                        <h5>Project Description</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac massa neque. Vivamus aliquam nulla eros, a luctus odio maximus eget. Duis ut rutrum dolor. Fusce metus magna, viverra at neque eget, commodo euismod risus. Etiam lectus leo, tristique at gravida vel, pretium id nulla. Nunc ornare lacus sit amet maximus molestie. Mauris porttitor tincidunt pulvinar. Sed eu augue tempor, bibendum felis vel, venenatis magna. Vestibulum a diam urna. Morbi tincidunt leo tempus, rhoncus est sit amet, molestie arcu. Proin bibendum interdum lectus, ut molestie velit luctus ac.</p>
                    
                        <p> <i style={{color:'blue'}}class="fas fa-link"></i> Links : </p>
                    </div>
                    <h4 className="text-center">Discussion</h4>


                    <form className="text-center spaceTop" onSubmit={e=>this.addComment(e)}>
                        <input placeholder="Add a comment.." id={"commentBox"}></input>
                        <button className="btn btn-danger leftSpace" type="submit">Comment</button>
                    </form>
                    <div style={{maxHeight: '100vh',overflowY: 'scroll'}}>

                   


                    <ul className="list-group" >
                        
                        {this.state.data.comments?this.state.data.comments.slice().reverse().map(item =>{

                            return <li className="list-group-item"><p><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs1Mtx-INbdQ5D3Xmsyq-D3HjpKmXnhKiqJsyzfNxzJ8gx-ewB"
                             style={{height:'35px',width:'auto'}}></img><a href="#"> {item.by} </a><span> 10 days ago</span></p>
                            <p><strong>Comment : </strong> {item.value}</p></li>
                        }):<li>No comments</li>}

                    </ul>
                    </div>
                    </div>
                    
                <div className="col-xs-12 col-md-6 noLeftPadding">
                 <div style={{backgroundColor:'rgb(76, 169, 83)',height:'15%',width:'100%',color:'white'}}>
                     <h4 className="text-center" style={{paddingTop:'14%'}}>{this.state.data.name}</h4>
                 </div>

                 <div className="row">
                    <div className="col-md-2 col-xs-10 offset-xs-1 offset-md-1 col spaceTop">
                      <h4 className="">{this.state.data.subtasks.length}  </h4>
                      
                      <p style={{color:'grey',fontSize:'14px'}}>Subtasks Created</p></div>
                     <div className="col-md-2 col-xs-10 offset-xs-1 offset-md-0 spaceTop">
                        <h4 className="" > {this.state.data.noOfCompleted} </h4>       
                       <p style={{color:'grey', fontSize:'14px'}}> Subtasks Completed</p></div>

                      <div className="col-md-2 col-xs-10 offset-xs-1offset-md-0 spaceTop">
                      <h4> 24:36 </h4>
                      <p style={{color:'grey' ,fontSize:'14px'}}>Time left</p></div>

                </div>

                
                    <div>
                     <h4 className="text-center">Subtasks</h4>
                     <ul className="list-group">
                         {this.state.data.subtasks?this.state.data.subtasks.map(item=>{

                              return <li className="list-group-item">
                                    {item.completed===0?<button style={{float:'right'}}className="btn" onClick={e=>this.completionHandler(e,item.id)}>Mark as completed</button>
                                    :<img  src="http://www.pngmart.com/files/3/Green-Tick-PNG-Pic.png" style={{float:'right',height:'1.5em'}}/>} 
                              <p><strong>Task Name:</strong>{item.name}</p>
                              <p><strong>Assigned to :</strong>{item.assignedto}</p>
                              <p><strong>Assigned by:</strong>{item.assignedby}</p>
                              <p><strong>Priority:</strong>{item.priority===1?<span>High Priority</span>:<span>Low Priority</span>}</p></li>
                         }):<li>Nothing here yet</li>}
                     </ul>

                    </div>


                    <div>
                    <h4>Schedule</h4>


                        </div>

            </div>


        </div>
        </div>




    )
}

}




ReactDOM.render(
  <DetailedView/>,
  document.getElementById('root')


);
