import React from "react";
import {useFormik} from 'formik';
import { userSchema } from "../../schemas/yup";
import {useNavigate} from 'react-router-dom';
const Register=()=> {
    const navigate=useNavigate();
    const initialValues={
        email:"",
        password:"",
        cpass:""
    }
    const {values,handleChange, handleBlur, handleSubmit, errors , touched}=useFormik({
        initialValues:initialValues,
        validationSchema:userSchema,
        onSubmit:async (value)=>{
            // console.log(value);
            const res=await fetch("http://localhost:5000/register",{
                method:"POST",
                headers:{
                "Content-Type":"application/json"},
                body:JSON.stringify({
                    email:value.email,
                    password:value.password
                })
            })
            const response=await res.json();
            alert(response.message)
            if(response.message==="Registered Successfully"){
                navigate("/");
            }
        }
    })
    // console.log(errors);
    const loginpage=(e)=>{
        e.preventDefault();
        navigate("/")
    }
    return (
      <>
          <div className="log-body">
                <div className="log-container">
                    <h1>REGISTER</h1>
                    
                    <form onSubmit={handleSubmit} >
                    <input type="email" placeholder="Email" autoComplete="new-email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} /> 
                    {errors.email && touched.email ? <pre className="error">{errors.email}</pre> : null}
                    <input type="password" placeholder="Password" autoComplete="new-password"  name="password" onBlur={handleBlur} onChange={handleChange} value={values.password} />
                    {errors.password && touched.password ? <pre className="error">{errors.password}</pre>: null}
                    <input type="password" placeholder="Confirm Password" autoComplete="new-cpass" name="cpass" onBlur={handleBlur} onChange={handleChange} value={values.cpass} /> 
                    {errors.cpass&& touched.cpass ? <pre className="error">{errors.cpass}</pre> : null}
                    <button type="submit" >Register</button>
                    <p className="register">If you Already have a account</p>
                    <button  onClick={loginpage}>Login</button>
                    </form> 
                </div>
          </div>
          
      </>
    );
  }
  
  export default Register;