const route=require("express").Router();
const userController=require("../controllers/auth");

route.post("/register",userController.createUser);
route.post("/login",userController.loginUser);
module.exports=route;
