import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './main.css';
import { useNavigate } from 'react-router-dom';
import Log from './Auth/login';

const Main=()=> {
  const navigate=useNavigate();
  const [input,setInput]=useState({
    activity:""
});

const [toggle, setToggle] =useState(false);

const postData= async (e)=>{
    e.preventDefault();
    console.log("hi")
    const {activity}=input;
    fetch("http://localhost:8080/todolist",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "accept": "application/json",
            "Authorization": localStorage.getItem("userDetail")
        },
        body: JSON.stringify({
            activity
        })
    }).then((res)=>{
        console.log(res)
        setToggle(!toggle);
    }).catch((e)=>{
        console.log(e);
    })
}

const [post,setPost]=useState([]);
useEffect(()=>{
    const d1 = {
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("userDetail"),
        }
    }
    axios.get("http://localhost:8080/todolist",d1).then((respond)=>{
        console.log(respond.data.data)
        setPost(respond.data.data);
    })
},[toggle])

const [timer,setTimer]=useState(0);
const [start,setStart]=useState(false);
const [timerId,setTimerId]=useState(0);
useEffect(()=>{
  let intervalId=null;
  if(start){
    intervalId=setInterval(()=>{
      setTimer(prev=>prev+=1);
    },1000);
    setTimerId(intervalId);
  }
  else{
    clearInterval(timerId);
  }
},[start])


const logOut=()=>{
  localStorage.clear();
   navigate("/")
}

  return (
    <>
    {localStorage.getItem("userDetail")?
    <div className='main-container'>
      <header>
        <p>{localStorage.getItem('userName').toUpperCase()} </p>
      </header> 
      <main>
        <div className='sidebar'>

          <button onClick={logOut}>LogOut</button>

        </div>
        <div className="contain">
          <div>
            <input className='task' type="number/text"
             value={input.activity} onChange={(e)=>setInput({...input,activity:e.target.value})}/>
            <button onClick={postData}>Add Activity</button>
          </div>
        </div>
      </main>
      </div>
       : <Log/>}
    </>
  );
}

export default Main;