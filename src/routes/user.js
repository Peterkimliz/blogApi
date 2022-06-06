const route=require("express").Router();
const userController=require("../controllers/user");

route.put("/update/:uid",userController.updateUser);
route.get("/profile/:uid",userController.getUserById);
route.delete("/profile/:uid",userController.deleteUserById);
route.get("/all",userController.getAllUsers);
module.exports=route;
