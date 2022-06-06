const {PostModel,UserModel}=require("../database");
exports.createPost=async(req,res)=>{
    try{
    const post =PostModel({
        title:req.body.title,
        desc:req.body.desc,
        photo:req.body.photo,
        username:req.body.username,
    });   
   const savedPost=await post.save();  
   res.status(201).json(savedPost);
    }catch(e){
        res.status(500).send(e);
    }
}

exports.updatePost=async(req,res)=>{
    try{
    const postId=req.params.uid;
    const post=await PostModel.findById(postId);
    if(post!=null){
        if(req.body.username===post.username){
            await PostModel.findByIdAndUpdate(postId,{$set:req.body})
            return res.status(200).json({message:"post deleted successfully"});
            }else{
                return res.status(401).json({message:"not permitted to update the post"});
            }
             
         }
        res.status(404).json({message:"post doesnot exist"});    

    }catch(e){
        res.status(500).send(e);
    }
}

exports.getPostById=async(req,res)=>{
    try{
    const postId=req.params.uid;
    const post=await PostModel.findById(postId);
    if(post==null){
        return res.status(404).json({message:"post doesnot exist"});
    }
    res.status(200).send(post);

    }catch(e){
        res.status(500).send(e);
    }
}
exports.deletePostById=async(req,res)=>{
    try{
    const postId=req.params.uid;
    console.log(postId);
    const post=await PostModel.findById(postId);
    if(post!=null){
        if(req.body.username===post.username){
            await PostModel.findByIdAndDelete(postId);
            return res.status(200).json({message:"post deleted successfully"});
        }else{
            return res.status(401).json({message:"not permitted to delete the post"});
        }
         
     }
    res.status(404).json({message:"post doesnot exist"});
    }catch(e){
        res.status(500).send(e);
    }
}
exports.getAllPosts=async(req,res)=>{
    try{
     const posts=await PostModel.find({});
     if(posts.length<=0){
        return res.status(404).json({});
     }
     res.status(200).json(posts);
    }catch(e){
        res.status(500).send(e);
    }
}