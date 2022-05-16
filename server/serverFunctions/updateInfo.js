// Update existed pokimon if existed
async function updateInfo(collection,pokname,pokhealth,pokfood){
    let w;
    collection.countDocuments({name:`${pokname}`}).then(res=>w=res);
    if(w!=0){collection.updateMany({name:`${pokname}`},{
        $set:{"health":pokhealth,"food":pokfood
    }})}
    else{throw "Error"}
}
module.exports=updateInfo;