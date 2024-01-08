
const Login = async(req,res)=>{
    try{
        const {username , password } = req.body
        let findUser = await db.user.finOne({username:username})
        if(!findUser){
        return  res.status(200).send({status:1,message:"User Does not exist"})
        }
        if(password != findUser.password){
            return res.status(200).send({status:1,message:"Password is Incorrect"})
        }
        return res.status(200).send({status:1,message:"user is fine" , data:findUser})
    }catch(error){
        console.log("Err" ,error)
        res.status(500).send({status:0 , message:"Something went wrong "})
    }
} 

const Signup = async(req,res)=>{
    try{
        const {username , password} = req.body 
        let findUser = await db.user.findOne({userName:username})
        if(findUser){
            return res.status(200).send({status:1,message:"User Already Exist Please Choose different Name",data:[]})
        }
        let data = {
            userName:username,
            password:password
        }
        let createUser = await db.user.create(data)
        return res.status(201).send({status:1,message:"User Created Successfully",data:[]})

    }catch(error){
        console("Sign up error")
        return res.status(500).send({status:0,message:"Something went wrong",data:[]})
    }
}

 let AllProducts = async(req, res) => {
    try {
        let category = req.query.category 
        const url = 'https://dummyjson.com/products';
            const response = await fetch(url);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        if(!category){ 
           return  res.status(200).send({status:1,message:"data",payload:jsonResponse})
        }
        let datafiltered = jsonResponse.filter(x => x.hasOwnProperty(category));
        return res.send({status:1,message:"Data Fetched Successfully",data:data})
        } catch (err) {
            console.log("error is coming",err)
    }
}

module.exports = {
    allProducts:AllProducts,

}