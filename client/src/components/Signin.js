import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import { toast } from "react-toastify";
import { FormWrapper } from "./authcard";
import logo from "./imgs/logo.png";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const SignIn  = ()=>{
    const {dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")

    const PostData = async (e) =>{
      e.preventDefault();

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){

            return toast.error("Invalid Email");
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{

           if(data.error){

              toast.error(data.error);
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})

               toast.success("Login successful");
               history.push('/myfollowingpost')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (

     <div className="container">
       <FormWrapper onSubmit={PostData}>
          <form>
                <img className="logo" src={logo} alt="logo" />

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

                <button type="submit" className="btn btn-primary">Sign In</button>
                <Link to="/reset">
                  <h6 className="forgot-password p-1 text-right">
                    Forgot password?
                  </h6>
                </Link>
                <div className="form-group">
                  <p className="forgot-password text-center">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </p>
                </div>
        </form>
        </FormWrapper>
  </div>
   )
}


export default SignIn
