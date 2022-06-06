const bcrypt=require("bcrypt");

const GenSalt=async()=>{
    return await bcrypt.genSalt(10);
}
const hashPassword=async(password,salt)=>{
    return await bcrypt.hash(password,salt);
}
const comparePassword=async(password,savedPassword)=>{
    return await bcrypt.compare(password,savedPassword); 
}
module.exports={
    GenSalt,
    hashPassword,
    comparePassword
}