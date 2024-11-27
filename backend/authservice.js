const bcrypt=require("bcrypt");

async function hashedpassword(password){
    const saltround = await bcrypt.genSalt(10);
  const hashed=await bcrypt.hash(password,saltround)
  return hashed;
}

async function comparepassword(password,hasdhedpassword){
    const data= bcrypt.compare(password,hasdhedpassword)
    return data
}

    async function regexemail(email){
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexEmail.test(email)
    }
    async function regexpassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        return passwordRegex.test(password);
      }
      

module.exports={
    hashedpassword,
    comparepassword,
    regexemail,
    regexpassword
}