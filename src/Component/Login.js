import React,{useState,useEffect} from 'react'
import './css/login.css'
import axios from "axios";
import base_url from "./api"

const Login = (props)=>{
  console.log(props)
  useEffect(()=>{

  let id = sessionStorage.getItem("id")
  if(id)
  {
    props.history.push('/home')
  }


  },[props.history])


  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [btn,setbtn] = useState(false)
  const [lgfailed,setlgfailed] = useState(false)

  const usernameChange = (event)=>{
    setUsername(event.target.value)
    if(event.target.value.length>0 && password.length>0)
      setbtn(true)
    else {
      setbtn(false)
    }

  }
  const passordChange = (event)=>{
    setPassword(event.target.value)

    if(username.length>0 && event.target.value.length>0)
      setbtn(true)
    else
      setbtn(false)


  }




  const login=(event)=>{
    setbtn(false)
    axios({
            method: 'post',
            url: base_url+'/login',
            data: {
                email: username,
                password: password
            }
        })
        .then(
          (response) => {
          sessionStorage.setItem("id",response.data)
          props.history.push('/home')
}, (error) => {
  console.log(error);
  setbtn(true)
  setlgfailed(true);
}
);
  }



  return(<div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
      { lgfailed && <span>
    Login failed! wrong username and password
  </span>  }

        <label>
          <p>Username</p>
          <input id='username' type="text" value={username} onChange={usernameChange}/>
        </label>
        <label>
          <p>Password</p>
          <input id="password" type="password" value={password} onChange={passordChange} />
        </label>
        <div>
          <br></br>
          <button id ='login' type="button" onClick={login} disabled={!btn}>Login</button>
        </div>
      </form>
    </div>);
}


export default Login;
