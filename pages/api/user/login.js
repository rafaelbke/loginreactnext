import { login } from "../../../services/user"

export default function handler(req,res){
try{
    console.log("chegounoLogin")
    const user = login(req.body)
    res.status(200).json(user)

}catch (err){
    res.status(400).json(err.message)

}

}