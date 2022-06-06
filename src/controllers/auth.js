const {UserModel}=require("../database")
const {GenSalt,hashPassword,comparePassword}=require("../utils");

exports.createUser=async(req,res,next)=>{
    try{
    const findUser=await UserModel.findOne({email:req.body.email});
    if(findUser==null){
     const salt=await GenSalt();
     var hashedPassword=await hashPassword(req.body.password,salt);   
      const newUser=UserModel({
          username:req.body.username,
          email:req.body.email,
          password:hashedPassword
      });  
     const user= await newUser.save();
     res.status(201).json(user);
    }else{
        res.status(409).send("Account with email address providede already exist")
    }    

    }catch(e){
     res.status(500).send(e);
    }
}
exports.loginUser=async(req,res,next)=>{
    try{
        const findUser=await UserModel.findOne({email:req.body.email});
        if(findUser!=null){
         const compare=await comparePassword(req.body.password,findUser.password);
         if(!compare){
            return res.status(400).send("wrong email or password")
         } 
         res.status(200).json(findUser); 

        }else{
            return res.status(400).send("wrong email or password")
        }

    }catch(e){
        
    }
}
