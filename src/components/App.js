import React, { Component } from 'react';
import Header from './Header.js';

class App  extends React.Component{



  constructor(props){
    super(props);
    this.state ={listofItems:[{text:'task1',subtasks:[] } , {text:'task2',subtasks:[] },{text:'task3',subtasks:[] },
      {text:'task4',subtasks:[] }],
    fetchedData:[{name:'Daipayan'}],initialData:this.props.testProp,user:'',id:'',userList:[]};
    this.handleClick = this.handleClick.bind(this);
    this.state.testtext = 'TEST';
    this.handleSubChange=this.handleSubChange.bind(this);
    this.submitTheDatatoDb=this.submitTheDatatoDb.bind(this);
    this.getSessionInfo=this.getSessionInfo.bind(this);


  }
  /*handleSubmit(e){

    let newitem={text:this.inputelem.value , subtasks:[]};
    if (newitem){
      this.setState((prevState)=>{let newlist=prevState.listofItems;newlist.push(newitem); return {listofItems:newlist}});
    };
    this.inputelem.value='';
    e.preventDefault();
  }*/

  handleClick(e,i) {

    let count=0;
    console.log(count);
    let newlist = this.state.initialData.filter(item=>{if(count!==i){++count;return item};++count});
    fetch('/api/taskDelete', {
      method: 'post',
      credentials:'include',
      headers:{

        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({id:i})
    })
    .then(res=>res.json())
    .then(data=>{console.log(data);
      fetch('/api/getDbData')
      .then(response=>response.json())
      .then(data=>{console.log(data);this.setState({initialData:data});})
    
    })


};





  priorityHandler(e,itemId,taskId,subtaskValue){
    console.log(e.target);
    console.log('WEEEEEEEEEEEE');
    let subtaskId = itemId;
    let maintaskId = taskId;

    fetch('/api/priorityHandler',{
      method: 'post',
      mode: 'cors',
      credentials:'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subtaskId , maintaskId }),
    })
    .then(response=>response.json())
    .then(data=>{console.log('Priority changed');this.newStateYayy()})
    .catch(error=>console.log(error));

    e.preventDefault();




  }

  


  handleSubChange(e,cursor,id,name){

    let inputag=document.getElementById(cursor);


    let subtaskValue=inputag.value;

    console.log('Sending to server->' + subtaskValue);





    fetch('/api/updateDb', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'subtaskname':subtaskValue,'maintaskId':id,'maintaskName':name}),

    })
      .then(response=> response.json())
      .then(data=>{console.log('WE UPDATED SOMETHING');this.newStateYayy();})
      .catch(error=>console.error);

    /*let count=0;
    console.log(e.target);
    let inputag=document.getElementById(i);


    let val=inputag.value;
    console.log(val);
    inputag.value="";
    let newlist = this.state.listofItems.filter(item=>
    {
      if(count==i)
      {
        ++count;

        let something = item;
        something.subtasks.push(val);
        return something;
      };
      ++count;
      return item;
    });


    this.setState({listofItems:newlist},function(){console.log(this.state.listofItems);});
*/

    e.preventDefault();


  }



  expandHandler(e,id){
    console.log('Task with id ='+id+"was clicked");
    let location='/view?id='+id;
    window.location.href=location;
    e.preventDefault();

  }



  fetchdata(){
    fetch('/api/getDbData')
      .then(response => {return response.json()})
      .then(data=>console.log(data))
    ;
  }



  handleAssignment(e,itemId,taskId){
    let assignedTo= e.target.value;
    console.log(assignedTo);
    let assignedby=this.state.user;
    let subtaskId = itemId;
    let maintaskId = taskId;
    
    fetch('/api/assignment',{
      method: 'post',
      mode: 'cors',
      credentials:'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({assignedto:assignedTo , assignedby , subtaskId , maintaskId }),
    })
    .then(response=>response.json())
    .then(data=>{console.log('Assigned someone');this.newStateYayy()})
    .catch(error=>console.log(error));
    
    e.preventDefault();




  }

  submitTheDatatoDb(e){

    let submittest1='submittest1';
    let values= document.getElementById(submittest1);

    let valueskavalue=values.value;

    fetch( '/api/submitDbData', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'data':valueskavalue,username:this.state.user}),

    })
      .then((response)=>{
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          return {'error':'error'};
        }
      })
      .then((data)=>{console.log('updated!!!');this.newStateYayy()})


    e.preventDefault();



  }



  getSessionInfo(){

    fetch('/api/sessionInfo',{credentials:'include'})
    .then(response=>response.json())
    .then(data=>{this.setState({user:data.name,id:data.id}) })


  }

getUserList=()=>{
  console.log('We came here');
  let elem= document.getElementById('selectOption');
  console.log(elem);
fetch('/api/userList')
.then(res=>{console.log(res);return res.json()})
.then(data=>{console.log(data);this.setState({userList:data})})
}


newStateYayy(){
    fetch('/api/getDbData')
      .then(response=>response.json())
      .then(data=>{this.setState({initialData:data});console.log(data)})
      .catch(error=>console.error());
  }

  componentDidUpdate()
  {
    console.log('State has Changed!');
  }


  componentWillMount(){
    console.log(this.props.testProp);
    this.getSessionInfo();
    this.getUserList();
    
    fetch('/api/getDbData')
      .then(response=>response.json())
      .then(data=>{
        if(data && data.length){this.setState({initialData:data});}
        else{this.setState({initialData:[{'name':'Add Tasks To Get Started'}]})};
        console.log(data+"WEEEEEEEEEEEEe");
      })
      .catch(error=>console.error());






  }

  componentWillUpdate(){
    console.log(this.props.testProp);

  }
 



  /*----------------------------------- RENDER STARTS --------------------------------*/
 
  render() {
    console.log('User'+this.state.user);
    return (
      <div className="App centeredClass">
        <Header user={this.state.user}/>
        {/*  <ul>
          {
            this.state.initialData.map((items,i)=>{
              return(
                <li key={i}>
                  {items.name}
                </li>
              );
            }
            )}

          </ul>*/}
         <div>
          
         <button style={{position: 'fixed'}} className="circle addButton">
              <img src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_speeddial_white_24dp_2x.png" alt="" />
         </button>
       
        <div className="App-intro spaceTop ">{
        



          this.state.initialData.map((items,i)=>{
            return(
              <div key={i} className="container">
                <span className="rightFloat" onClick={e=>{this.handleClick(e,items._id);}}>
                  <strong>x</strong>
                </span>
                  <br></br>
                  <br></br>
                  <br></br>
                <span onClick={e=>this.expandHandler(e,items._id)} style={{cursor:'pointer'}}><h4><strong>{items.name}</strong></h4>
                <br></br>
                <br></br>
                {items.time?<p>Added on:{items.time}</p>:<p>No date info available</p>}
                {items.createdBy?<p>Created by:{items.createdBy}</p>:<p>No info</p>}
                </span>
                <br></br>
                <div className="row">
                    <div className="col-md-2 col-xs-12 offset-md-3">
                      {items.subtasks?<p className="badge smallBackground ">{items.subtasks.length}  </p>:<p></p>}
                      
                      <p><h5>Subtasks Created</h5></p></div>
                     <div className="col-md-2 col-xs-12">
                        <p className="badge smallBackground " > {items.noOfCompleted} </p>       
                      <p> <h5> Subtasks Completed</h5></p></div>

                      <div className="col-md-2 col-xs-12">
                      <p> None </p>
                       <p><h5>Deadline</h5></p></div>

                </div>
                
                <div className="row">
                  { items.subtasks? (
                    items.subtasks.map((item,i)=>{
                      return (<div key={i} className="col-sm-4  spaceBelow">
                        
                        <div className="card"  style={{borderTop: item.priority?'5px solid red':'0'}}>

                  <br></br>
                  <br></br>
                        <p className="floatRight"><a href="#"><i class="fas floatRight fa-ellipsis-v"></i></a>
                        <a href="#"><i onClick={e=>this.priorityHandler(e,item.id,items._id,item.name)} title="Prioritise task" className="far floatRight fa-star hoverGold" style={{color: item.priority?'#E2E20C':'black'}}></i></a>

</p>
                        
                  <br></br>

                        <span><h5 title={item.priority?"Prioritised Task":"Normal Priority"} >{item.name}</h5> {item.completed===1?<img  src="http://www.pngmart.com/files/3/Green-Tick-PNG-Pic.png" style={{height:'1.5em'}}/>:<p></p>}</span>
                        <p>Assigned to: {item.assignedto}</p>
                        <p>Assigned by: {item.assignedby}</p>
    
                      <select  disabled={item.completed===1?true:false} value={item.assignedto || ' ' } onChange={e=>this.handleAssignment(e,item.id,items._id)}>
                      <option value=''></option>
                        {
                          this.state.userList.map(user=>{
                            return <option value={user.name}>{user.name}</option>
                          })
                        }
                      </select>
                      </div>
                      </div>
                    )})

                  ):( <div>Nothing to see here</div>)

                  }


                </div>



                <form onSubmit={e=>this.handleSubChange(e,i,items._id,items.name)}>
                  <input placeholder="Subtasks.." id={i}></input>
                  <button className="btn btn-success leftSpace" type="submit">Add a subtask</button>

                </form>
              </div>
            )
          })
        }
        </div>





        <form  className=" spaceTop centeredClass" onSubmit={this.submitTheDatatoDb}>
          <input name="submittest1" id="submittest1" placeholder="New Task.."></input>
          <button className="btn btn-primary leftSpace " type="submit">Add a Task!</button>
        </form>
        </div>
      </div>
    );
  }
}

export default App;
