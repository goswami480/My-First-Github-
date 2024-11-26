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
        const regexemailemail = /^[a-zA-Z0-9._%+-]+@(?:gmail\.com|yahoo\.com)$/
        return regexemailemail.test(email)
    }

module.exports={
    hashedpassword,
    comparepassword,
    regexemail
}