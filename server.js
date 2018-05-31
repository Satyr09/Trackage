import config from './config';
import fs from 'fs';
import apiRouter from './api';

import serverRender from './serverRender'
const bodyParser= require('body-parser');
import express from 'express';
var session=require('express-session');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.set('view engine', 'ejs');





server.use(session({
  secret:'Satyr09',
  saveUninitialized:false,
  resave:false
}));








var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';





/*-------------------------------------SUBMITTING TASK TO DB----------------------------------------------------*/







server.post('/api/submitDbData', (req,res)=>{

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    var currentTime = new Date();
    
    var currentDay = currentTime.getDate();
    var currentMonth = currentTime.getMonth();
    var currentYear = currentTime.getFullYear();

    var date=currentDay+'/'+currentMonth+'/'+currentYear;

    var time= currentTime.getHours()+':'+currentTime.getMinutes();
    
    var completeDate= date +' at '+time;
    
    var createdBy = req.body.username;

    console.log('TIME: ------------------------ '+ completeDate);
    var myobj = { name:req.body.data, subtasks:[],time: completeDate, createdBy:createdBy , comments:[], noOfCompleted:0 };


    dbo.collection('anotherone').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log('1 document inserted'+res);
      db.close();

    });
    return res.send(req.body);
  });

});


/*--------------------------------------Detailed View------------------------------*/


server.get('/view', function(req, res) {
  console.log(req.query.id+"QUERY!!!!!!!!!!!");  
  
  if(1)
  res.render('detailedview');
  else{
    res.redirect('login');
  }
});



/*----------------------------------TASK DATA---------------------------------------------------- */

server.post('/api/taskData',(req,res)=>{

  let taskId=req.body.taskid;
  console.log(req.body);
  console.log('Task id->'+taskId);

  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://127.0.0.1:27017/';

  var ObjectId = require('mongodb').ObjectId;
  var o_id = new ObjectId(taskId);

  MongoClient.connect(url, function(err, db) {
    
    
        if (err) throw err;
        var dbo = db.db('test');
    
    
    
        var myquery = {_id:o_id };
        console.log(myquery._id);
    
    
    
        dbo.collection('anotherone').findOne(myquery,function(err,result) {
          if (err) {console.log('SOMETHING BAD');
            return res.send({})}
          else{
          }
          db.close();
          return res.send(result);
          
    
        });
    });



})

/*------------------------------------------SUBMITTING COMMENTS----------------------------------*/





server.post('/api/submitComment', (req,res) => {
  
    let d = new Date();
    let time= d.getTime();
    let commentValue=req.body.commentValue;
    let maintaskId=req.body.mainTaskId;
    let commentBy= req.body.commentBy;
  
  
    console.log(commentValue+" "+ commentBy+" "+maintaskId);
  
  
  
  
  
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://127.0.0.1:27017/';
  
    var ObjectId = require('mongodb').ObjectId;
    var o_id = new ObjectId(maintaskId);
    console.log(time);
    let newtime=time+'Subtask';
    
    
    
  
    MongoClient.connect(url, function(err, db) {
  
  
      if (err) throw err;
      var dbo = db.db('test');
  
  
  
      var myquery = {_id:o_id };
  
  
  
      dbo.collection('anotherone').update(myquery,{ $push: { comments:{value: commentValue,by:commentBy,time:time} } },function(err, res) {
        if (err) console.log('SOMETHING BAD');
        db.close();
  
      });
      return res.send({value:req.body.commentValue,by:req.body.commentBy,time:time});
  });
  
  });

/*------------------------------------------SUBMITTING SUBTASKS----------------------------------*/





server.post('/api/updateDb', (req,res) => {

  console.log('Are we here bro');
  let d = new Date();
  let time= d.getTime();
  let subtaskValue=req.body.subtaskname;
  let maintaskId=req.body.maintaskId;
  let maintaskName=req.body.maintaskName;


  console.log('These data were sent ->' + subtaskValue + '  ' + maintaskId+ '  '+ maintaskName);






  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://127.0.0.1:27017/';

  var ObjectId = require('mongodb').ObjectId;
  var o_id = new ObjectId(maintaskId);
  console.log(time);
  let newtime=time+'Subtask';
  
  
  

  MongoClient.connect(url, function(err, db) {


    if (err) throw err;
    var dbo = db.db('test');



    var myquery = {_id:o_id };



    dbo.collection('anotherone').update(myquery,{ $push: { subtasks:{name: subtaskValue,id:newtime,assignedby:'Dai ',completed:0} } },function(err, res) {
      if (err) console.log('SOMETHING BAD');
      db.close();

    });
    return res.send(req.body);
});

});



/*----------------------------------------------MARK COMPLETED------------------------------------------------------*/
server.post('/api/markCompleted', (req,res)=>{



  let maintaskId=req.body.mainTaskId;
  let subtaskId=req.body.subtaskId;
  let noOfCompleted=req.body.currentComplete+1;
  let completedBy = req.body.completedBy;



  let date= new Date();
  let day=date.getDate();
  let month=date.getMonth();
  let year=date.getFullYear();

  let finaldate=day+'-'+month+'-'+year;

  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://127.0.0.1:27017/';

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    var ObjectId = require('mongodb').ObjectId;
    var o_id = new ObjectId(maintaskId);
    
    dbo.collection('anotherone').update(
      { _id : o_id,"subtasks.id":subtaskId },
      { $set: {"subtasks.$.completed": 1,"subtasks.$.completedBy":completedBy, "subtasks.$.completedOn": finaldate

      }},function(err,res){
        if(err)
        console.log('OOOOPS');
        else{
          console.log(' 1 document updated ---->'+res);
        }

        db.close();
      }
  )
})

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    console.log('WE CAME HERE AT LEAST!!!!!!!!!----------');
    var dbo = db.db('test');
    var ObjectId = require('mongodb').ObjectId;
    var o_idd = new ObjectId(maintaskId);


  dbo.collection('anotherone').update(
    { _id : o_idd },
    { $set :{noOfCompleted:noOfCompleted}},function(err,res){
      if(err)
      console.log('OOOOPS');
      else{
        console.log('We came here yayy!!!!!');
        console.log(' 1 document updated ---->'+res);
      }

      db.close();
    }
)


  return res.send(req.body);
  

})
})
/*------------------------------------------USER LIST--------------------------------------*/


server.get('/api/userList', (req,res)=>{
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://127.0.0.1:27017/';

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    dbo.collection('RegisteredUSers').find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      console.log('sendiiiiiiiiiiiiiiiiiing thiiiiiiiiiiiis');

      db.close();
      return res.send(result);

    });
});

  

})

/*----------------------------------------Delete------------------------------------------*/

server.post('/api/taskDelete', (req,res)=>{
  
  
  
  
  let maintaskId=req.body.id;

  console.log('ID FOR DELETE- >' + maintaskId)

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");

    let ObjectId = require('mongodb').ObjectId;
    let o_id = new ObjectId(maintaskId);
    
    
    dbo.collection("anotherone").deleteOne({_id:o_id}, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });

    return res.send(req.body);
  });
})
/*-------------------------------------------------PRIORITY-------------------------------------------------*/




server.post('/api/priorityHandler', (req,res)=>{
  
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://127.0.0.1:27017/';
  
    let maintaskId=req.body.maintaskId;
    let subtaskId=req.body.subtaskId;
    let priorityChanged = 1;
  
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db('test');
      var ObjectId = require('mongodb').ObjectId;
      var o_id = new ObjectId(maintaskId);
  
  
  
  
  
  
  
      dbo.collection('anotherone').update(
        { _id : o_id,"subtasks.id":subtaskId },
        { $set: {"subtasks.$.priority": priorityChanged,
  
        }},function(err,res){
          if(err)
          console.log('OOOOPS');
          else{
            console.log(' 1 document updated ---->'+res);
            db.close();
          }
  
  
        }
  )
      return res.send(req.body);
    });
  });




/*-------------------------------------------------Assignment-----------------------------------------------*/


server.post('/api/assignment', (req,res)=>{

  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://127.0.0.1:27017/';

  let assignedto=req.body.assignedto;
  let assignedby = req.body.assignedby;
  let maintaskId=req.body.maintaskId;
  let subtaskId = req.body.subtaskId;


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    var ObjectId = require('mongodb').ObjectId;
    var o_id = new ObjectId(maintaskId);








    dbo.collection('anotherone').update(
      { _id : o_id,"subtasks.id": subtaskId},
      { $set: {"subtasks.$.assignedto": assignedto,"subtasks.$.assignedby": assignedby}}
        ,function(err,res){
        if(err)
        console.log('OOOOPS');
        else{
          console.log(' 1 document updated ---->'+res);
          db.close();
        }


      }
)
    return res.send(req.body);
  });





})

/*----------------------------------------USER TASK LIST----------------------------------------------------------*/

server.post('/api/getUserTasks', (req,res)=>{


  let user=req.body.user ;
  let id=req.body.id;
  console.log(user+"  SDSD   ");
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    dbo.collection('anotherone').find({'subtasks.assignedto':user}).toArray(function(err, result) {
      if (err) throw err;
      console.log('Are we here!');
      console.log(result);
      db.close();
      return res.send(result);

    });
});



})



/*------------------------------------User Completed List------------------------------*/

server.post('/api/getUserCompleted', (req,res)=>{
  
  
    let user=req.body.user ;
    let id=req.body.id;
    console.log(user+"  SDSD   ");
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db('test');
      dbo.collection('anotherone').find({'subtasks.completedBy':user}).toArray(function(err, result) {
        if (err) throw err;
        console.log('Are we here!');
        console.log(result);
        db.close();
        return res.send(result);
  
      });
  });
  
  
  
  })
/*-------------------------------------------NEW REGISTRATION----------------------------------------------------- */





server.post('/api/register/newregistration', (req,res)=>{



  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://127.0.0.1:27017/';



  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');


    console.log(req.body.username+'<-----WAS BEING INSERTED');



    var myobj = { name:req.body.username, password:req.body.password,
      location:req.body.location,
      age:req.body.age, 
      gender:req.body.gender,
      org:req.body.org };


    dbo.collection('RegisteredUSers').insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log('1 document inserted'+res);
      db.close();

    });
    return res.send(req.body);
  });




});





/*------------------------------------------LOGIN-------------------------------------------------*/






server.post('/api/login', (req,res)=>{
  
  
  console.log('Set here:'+ req.session.id);
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://127.0.0.1:27017/';
  
    var found=0;
  
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db('test');
  
  
      var query = { name:req.body.username, password:req.body.password };
  
  
      dbo.collection('RegisteredUSers').findOne(query ,function(err, result) {
        console.log("WE FOUND IT :"+result);

        if (err) console.log(err);
        else{
          if(result){
            req.session.username=req.body.username;
            req.session._id=result._id;
            res.redirect('/');
          }
          else if(!result){
            console.log('ummmmmmmmmm');
            res.redirect('/register');
            
          }
        
             
         
        
        }
        db.close();
  
      });

      function setTrue(data){
        console.log(found);
        req.session.username=req.body.username;
        req.session._id=data;
        console.log(req.session.username+"  ID  : "+req.session._id);
        return res.render('reg');

      }
      function setFalse(){
        console.log(found);
      }
      


    });
  
  
  
  
  });


  /*---------------------------------LOGOUT---------------------------------------*/


  server.get('/logout', (req,res)=>{

    req.session.destroy();
    res.redirect('/login');


  })








server.get('/api/getDbData' , (req,res)=>{

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');
    dbo.collection('anotherone').find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log('Are we here!');

      db.close();
      return res.send(result);

    });
});
});







server.get('/', (req,res)=>{

  if(req.session.username){
  serverRender()
    .then(function(content){
      
      { console.log('From index page: '+req.session.username);
        
        return res.render('index', {
      content , name:req.session.username
    });}})
    .catch(error=>console.error())
  }
  else{
    res.redirect('/login');
  }

});





server.get(["/profile", "/profile/*"] , (req,res)=>{

  if(req.session.username){
    res.render('profile');
  }

  else{
    res.redirect('/login');
  }
})







server.post('/api/getUserInfo', (req,res)=>{



  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://127.0.0.1:27017/';

  var idhere=req.body.id;
  console.log('BROOOOOOOOOOOOOOOO'+req.body.id);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db('test');

    var ObjectId = require('mongodb').ObjectId;
    console.log('The id is:' + idhere);
    var o_id = new ObjectId(idhere);


    var query = { _id:o_id};


    dbo.collection('RegisteredUSers').findOne(query ,function(err, result) {
      console.log("WE FOUND IT :"+result);

      if (err) console.log(err);
      else{
        console.log(result.name+"RES");
        if(result){
            res.send(result);
        }
        else if(!result){
          console.log('ummmmmmmmmm');
          res.redirect('/register');
          
        }
      
           
       
      
      }
      db.close();




});

  })
});

server.get('/register', (req,res)=>{ 
  res.render('reg');

});

server.get('/login', (req,res)=>{
  if(req.session.username){
    res.redirect('/');
  }
  
  console.log('Username:' + req.session.username);
  res.render('login');

});

server.get('/getdata', (req,res)=>{
  return res.send({add:'somejjblknknthing'});
});



server.post('/api/update', (req, res)=> {
  console.log('updating-', req.body);
  return res.sendStatus(200);
});



server.get('/api/sessionInfo', (req,res)=>{

  console.log("here now:" +req.session.username);
  if(req.session.username){
    let responseobject = {name:req.session.username,id:req.session._id};
    console.log('Sending resposne: '+responseobject);

    return res.send(responseobject);
  }
  else
   return res.send({name:'Session not set'});
});



server.use(express.static('public'));
/*
server.get('/about.html', (req,res)=>{
  fs.readFile('./about.html', (err,data)=>{
    res.send(data.toString());
  });
});
*/


server.listen(config.port, config.host, () => {
  console.info('Express listening on port' , config.port);
});
