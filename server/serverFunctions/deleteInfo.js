// A function that deletes specific pokimon information from the database collcetion
async function deleteInfo(collection,pokname){
    let w;
    collection.countDocuments({name:`${pokname}`}).then(res=>w=res);
    if(w!=0){collection.deleteMany({name:`${pokname}`});}
    else{throw "Error"}
}
module.exports=deleteInfo;