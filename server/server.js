// Server port and all libraries that are used in order to make client server communication
const MongoClient=require('mongodb').MongoClient;
const express=require('express');
const path=require('path');
// const cors=require('cors');
const app=express();
const port=3000;


// Some variables(Functions) from the serverFunctions to use
const insertInfo=require('./serverFunctions/insertInfo');
const updateInfo=require('./serverFunctions/updateInfo');
const deleteInfo=require('./serverFunctions/deleteInfo');
const registerInfo=require('./serverFunctions/registerInfo');
const logInInfo=require('./serverFunctions/logInInfo');
let loggedin=false;

const pages_dir = path.resolve(__dirname, "..", "client", "pages");
const public_dir = path.resolve(__dirname, "..", "client", "public");
// Data base information
const url = 'mongodb://localhost:27017';
const database='finalproject';
app.use(express.static(public_dir));
app.use(express.urlencoded({ extended: false }));


// main page
app.get('/',(req,res)=>{
    console.log(loggedin);
    if(loggedin){res.sendFile(path.join(pages_dir,'loggedin.html'))}
    else{res.sendFile(path.join(pages_dir,'index.html'))};
})
// information page
app.get('/information',function(req,res){
        res.sendFile(path.join(pages_dir,'information.html'));
})

app.get('/logOut',(req,res)=>{
    loggedin=false;
})
// get Information call to get information from data base to user
app.get('/getInfo',(req,res)=>{
    const result=[]
    MongoClient.connect(url,(err,client)=>{
        if (err) throw err;
        const db=client.db(database);
        const collection=db.collection('information');
        collection.find({}).toArray(function(err,docs){
            res.send(docs);
        });
    
    });
})
// update call function from server to update an existed pokimon in the database if existed
app.get('/updatePokemon',(req,res)=>{
    MongoClient.connect(url,(err,client)=>{
        if (err) throw err;
        const db=client.db(database);
        const collection=db.collection('information');
        updateInfo(collection,req.query.name,req.query.health,req.query.food)
    });
    res.end();
})
// delete a pokimon
app.get('/deletePokemon',(req,res)=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        const db=client.db(database);
        const collection=db.collection('information');
        deleteInfo(collection,req.query.name);
    })
    res.end();
})
// Some pages log in ,register ....
app.get('/login',(req,res)=>{
    res.sendFile(path.join(pages_dir,'login.html'));
})
app.get('/loggedin',(req,res)=>{
    console.log(loggedin);
    res.sendFile(path.join(pages_dir,'loggedin.html'));
})
app.get('/register',(req,res)=>{
    res.sendFile(path.join(pages_dir,'register.html'));
})
app.get('/update',(req,res)=>{
    res.sendFile(path.join(pages_dir,'update.html'));
});
app.get('/delete',(req,res)=>{
    res.sendFile(path.join(pages_dir,'delete.html'));
})
app.get('/addInfo',(req,res)=>{
    res.sendFile(path.join(pages_dir,'addPokemon.html'));
});
// adding a pokimon from the user to the data base by the server
app.get('/addPok',(req,res)=>{
    MongoClient.connect(url,(err,client)=>{
        const db=client.db(database);
        const collection=db.collection('information');
        insertInfo(collection,[{name:req.query.name},{health:req.query.health},{food:req.query.food}]);
    });
    res.end();
});
// login function to login the user if registered and full the information correctly
app.post('/logIn',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    let data;
    loggedin=false;
    MongoClient.connect(url,async (err,client)=>{
        let temp=[]
        const db=client.db(database);
        const collection=db.collection('users');
        await logInInfo(collection,[{email:email},{password:password}]).then(q=>data=q);
        if(!(data==undefined||data===null)&&data!=false){loggedin=true};
        res.send(data);
    });
});
// register
app.post('/register',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    let data;
    MongoClient.connect(url,async (err,client)=>{
        let temp=[]
        const db=client.db(database);
        const collection=db.collection('users');
        await registerInfo(collection,[{email:email},{password:password}]).then(q=>data=q);
        if(data==true){loggedin=true};
        res.send(data);
    });
});
// server listening to the port 
app.listen(port,()=>{
    console.log('Server connected!');
})