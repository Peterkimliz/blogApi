const {UserModel}=require("../database")
const {GenSalt,hashPassword}=require("../utils");

exports.updateUser=async(req,res)=>{
    try{
    const uid=req.params.uid;    
    const findUser=await UserModel.findById(uid);
    
    if(findUser!=null){
        if(req.body.password){
            const salt = await GenSalt();            
            req.body.password=await hashPassword(req.body.password,salt);
        }  
        await UserModel.findByIdAndUpdate(uid,{$set:req.body})
        res.status(200).json({messaage:"profile has been updated"});
       }else{
        res.status(404).send("No user found")
     }    
    }catch(e){
     res.status(500).send(e);
    }
}
exports.getUserById=async(req,res)=>{
    try{
    const uid=req.params.uid;    
    const findUser=await UserModel.findById(uid);
    if(findUser!=null){        
        res.status(200).json(findUser);
       }else{
        res.status(404).send("No user found")
     }    
    }catch(e){
     res.status(500).send(e);
    }
}

exports.deleteUserById=async(req,res)=>{
    try{
    const uid=req.params.uid;    
    const findUser=await UserModel.findById(uid);
    if(findUser!=null){       
        await UserModel.findByIdAndDelete(uid);
        res.status(200).json({message:"user deleted successfully"});
       }else{
        res.status(404).send("No user found")
     }    
    }catch(e){
     res.status(500).send(e);
    }
}

exports.getAllUsers=async(req,res)=>{
    try{
        const findUsers=await UserModel.find({});
        if(findUsers<=0){
         return res.status(404).json({});   
        }   
       res.status(200).json(findUsers);
    }catch(e){
        res.status(500).send(e);
    }
}
