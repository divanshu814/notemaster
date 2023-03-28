import React from 'react'
import { useState } from 'react'
// import useHistory from 'react-router-dom'
import {  useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let navigate =useNavigate();
    // const [password, setPassword] = useState("")

    const handleSubmit= async(e)=>{
        e.preventDefault();

        // fetch("http://localhost:5000/api/auth/login")
        const response = await fetch(`http://localhost:5000/api/auth/login`
        , {
        method: 'POST', 
        
        headers: {
          'Content-Type': 'application/json',
          
          
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password})

      });

      const json=await response.json()
      console.log(json);
      if(json.success){

        localStorage.setItem('token', json.authToken);
        navigate("/")
        props.showAlert("Logged In Successfully", "success");
      }
      else{
        // alert("invalid credentials")
        props.showAlert("Invalid credentials", "danger");
      }

    }
    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    

  return (
    <div>
      <h1 className='my-3' >Login to continue</h1>

<form onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
  </div>
  {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div> */}
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Login