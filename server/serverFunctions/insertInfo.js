// A function that add a pokimon data 
async function insertInfo(collection,data){
    collection.insertOne({name:`${data[0].name}`,"health":`${data[1].health}`,"food":`${data[2].food}`},(err)=>{
        if(err) throw err;
    });
}
module.exports=insertInfo;