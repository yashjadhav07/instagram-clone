import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { FormWrapper } from "./authcard";
import { toast } from "react-toastify";
import logo from "./imgs/logo.png";
const SignUp  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const uploadFields = async (e) =>{
      e.preventDefault();
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return toast.error("Invalid Email");
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:"https://res.cloudinary.com/dbk3dftmx/image/upload/v1625901209/defaultpic_ydudez.jpg"
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){

              toast(data.error);
           }
           else{

               toast(data.message);
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

   return (

    <div className="container">
      <FormWrapper onSubmit={uploadFields}>
         <form>
               <img className="logo" src={logo} alt="logo" />
               <div className="form-group">
                 <h6 className = "p-1 text-left">Name</h6>
                   <input
                     type="text"
                     className="form-control"
                     placeholder="John Wick"
                     value={name}
                     onChange={(e)=>setName(e.target.value)}
                  />
               </div>

               <div className="form-group">
                   <h6 className="p-1 text-left">Email</h6>
                     <input
                     type="email"
                     className="form-control"
                     placeholder="johnwick@gmail.com"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     />
               </div>

               <div className="form-group">
                   <h6 className="p-1 text-left">Password</h6>
                     <input
                       type="password"
                       className="form-control"
                       placeholder="Enter password"
                       value={password}
                       onChange={(e)=>setPasword(e.target.value)}
                     />
               </div>

               <button type="submit" className="btn btn-primary">Sign Up</button>
               <div className="form-group">
                 <p className="forgot-password text-center">
                   Don't have an account? <Link to="/signin">Sign In</Link>
                 </p>
               </div>
       </form>
       </FormWrapper>
 </div>
   )
}


export default SignUp;
