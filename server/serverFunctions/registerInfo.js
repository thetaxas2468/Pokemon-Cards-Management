// Sign up function used by server to sign up the user and save the information in the data base without encryption
async function logInInfo(collection,data){
    const email=data[0].email;
    const password=data[1].password;
    var res;
    var ret;
    await collection.find({email:`${email}`}).toArray().then(result=>{
        if(result.length==0){
            collection.insertOne({email:`${email}`,password:`${password}`});
            return true;
        }
        else{
            return false;
        }
    }).then(result=>ret=result);
    return ret;
}
module.exports=logInInfo;