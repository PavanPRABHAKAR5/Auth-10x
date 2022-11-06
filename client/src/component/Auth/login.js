import "./log-res.css";
import {useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import axios from 'axios';
import {loginSchema} from '../../schemas/yuplogin';
const Log=()=> {
    const navigate=useNavigate();
    const initialValues={
        email:"",
        password:""
    }
    const {values, handleChange, handleBlur , handleSubmit , errors , touched}=useFormik({
        initialValues:initialValues,
        validationSchema:loginSchema,
        onSubmit: async (value)=>{
            console.log(value);
            const userInfo=await axios.post("http://localhost:5000/register/login",value);
            alert(userInfo.data.message);
            localStorage.setItem("userDetail",userInfo.data.token)
            localStorage.setItem("userName",(userInfo.data.login.email).split("@")[0])
            // localStorage.setItem("userInfo", JSON.stringify(value));
            //  alert(userInfo.data.message);
            if(userInfo.data.message==="Logged In Successfully"){
                localStorage.getItem("userDetail")?
                navigate("/main"):<Log/>
            }
        }
    })
    const nav=(e)=>{
        e.preventDefault();
        navigate("/reg")
    }

    return (
      <>
          <div className="log-body">
                <div className="log-container">
                    <h1>LOGIN</h1>
                    <form onSubmit={handleSubmit}>
                        <input placeholder="Email" autoComplete="new-email"  name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} required/>
                        {errors.email && touched.email ? <pre className="error">{errors.email}</pre> : null}
                        <input type="password" placeholder="Password " name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} required/>
                        {errors.password && touched.password ? <pre className="error">{errors.password}</pre> : null}
                        <button type="submit">Login</button>
                        <p className="register">If you don't have account</p>
                        <button onClick={nav}>Register</button>
                    </form>
                </div>
          </div>
      </>
    );
  }
  
  export default Log;