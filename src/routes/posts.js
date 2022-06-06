const route=require("express").Router();
const postController=require("../controllers/posts");

route.post("/create",postController.createPost);
route.get("/all",postController.getAllPosts);
route.get("/:uid",postController.getPostById);
route.put("/update/:uid",postController.updatePost);
route.delete("/delete/:uid",postController.deletePostById);
module.exports=route;
