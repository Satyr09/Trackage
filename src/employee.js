import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import styles from '../public/style.css';
import style from '../public/employeestyle.css';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import Header from './components/Header.js'



class Table1 extends React.Component {


    constructor(props){
        super(props);
        this.state={user:'',sessionId:'',data:[{name:'',location:'',age:'',gender:'',org:''}]};

    }
    getSessionInfo(){
        
        fetch('/api/sessionInfo',{credentials:'include'})
        .then(response=>response.json())
        .then(data=>{this.setState({user:data.name,sessionId:data.id});})
    }
    getData(){
        fetch('/api/userList', {
            mode:'cors',
            credentials:'include',
            headers:{
                
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }
        })
        .then(res=>res.json())
        .then(data=>{this.setState({data})})
    }


    componentDidMount(){
        this.getSessionInfo();
        this.getData();

    }

    changeFilterName=(e)=>{
        this.setState({filterName:e.target.value},this.changeState);
      }
    changeState=()=>{

        let val=this.state.filterName;
        console.log(val+"VALUE");
        console.log(this.state);
        let tempArr=this.state.data.map(item=>{

            console.log(item.name);
            if(item.name.substring(0,this.state.filterName.length).toLowerCase()===this.state.filterName.toLowerCase())
            {
                return item;
            }
        })
        this.setState({data:tempArr})


    }  

    nameFilter = (e) => {
        this.refs.nameCol.applyFilter(e.target.value);
      }

    
    render() {
      return (
        <div>
            <Header user={this.state.user}/>

            <div class="form-group row spaceTop">
                  <div class="col-sm-6 col-md-4 offset-md-4 offset-sm-3">
                      <label><h5>Search</h5></label>
                      <input type="email" class="form-control" id="nameFilter" onChange={this.nameFilter} placeholder="Search by name"></input>
                  </div>
            </div>
          <BootstrapTable data={this.state.data}>
            <TableHeaderColumn isKey ref='nameCol' dataField='name' filter={ { type: 'RegexFilter', delay: 1000 } }>
              Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField='age'>
              Age
            </TableHeaderColumn>
            <TableHeaderColumn dataField='gender'>
              Gender
            </TableHeaderColumn>
            <TableHeaderColumn dataField='location'>
              Location
            </TableHeaderColumn>
            <TableHeaderColumn dataField='org'>
              Organisation
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }
   


if(typeof window !== 'undefined'){
ReactDOM.render(
  <Table1/>,
  document.getElementById('root')


);}