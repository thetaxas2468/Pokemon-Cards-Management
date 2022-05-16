// A function that check specific information from the user if exist in data base a log in info
// Check email if exists if yes check password
async function logInInfo(collection,data){
    const email=data[0].email;
    const password=data[1].password;
    var res;
    var ret;
    await collection.find({email:`${email}`}).toArray().then(result=>{
        if(result.length==0){
            return null;
        }
        else if(password.localeCompare(result[0].password)!==0){
            return false;
        }
        res={
            email:result[0].email,
            password:result[0].password
        };
        return res;
    }).then(q=>ret=q);
    return ret;
}
module.exports=logInInfo;