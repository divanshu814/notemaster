import React from 'react'
import { useState } from 'react'
// import useHistory from 'react-router-dom'
import {  useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    let navigate =useNavigate();



    const handleSubmit= async(e)=>{
        e.preventDefault();

        // THIS THING OF GETTING FIELDS OUT OF THE CREDENTIALS IS CALLED DESTRUCTURING
        const {name, email, password}=credentials;

        // fetch("http://localhost:5000/api/auth/login")
        const response = await fetch(`http://localhost:5000/api/auth/createuser`
        , {
        method: 'POST', 
        
        headers: {
          'Content-Type': 'application/json',
          
          
        },
        body: JSON.stringify({name, email, password})

      });

      const json=await response.json()
      console.log(json);
      if(json.success){

        localStorage.setItem('token', json.authToken);
        navigate("/")
        props.showAlert("Account Created", "success");
      }
      else{
        // alert("")
        props.showAlert("Invalid Credentials", "danger");
      }
      

    }
    const onChange =(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    


  return (
        <>
        <h1 className='container my-4' >Create a New User</h1>
      <div className='container mt-5 '>
<form onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required />
  </div>
  {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
</div> */}
  <button type="submit" className="btn btn-primary">Submit</button>
</form>


    </div>
</>
  )
}

export default Signup