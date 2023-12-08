import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [user, setUser]=useState({pin:""})
    let history=useNavigate();
    const onsubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5600/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({pin:user.pin,}),
          });
          const json=await response.json();
          console.log(json);
          if(json.success)
          {
            localStorage.setItem('token', json.authtoken);
        
          }
       
          
        
    }
    const onchange=(e)=>{
        setUser({...user,[e.target.id]:e.target.value})
    }
  return (
    <div>
      
<div className="container">
<form  onSubmit={onsubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Enter Pin</label>
    <input type="email" className="form-control" id="pin" onChange={ onchange} aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your Pin with anyone but you can send this pin to your someone to access it.</div>
  </div>
 
  
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
</div>

    </div>
  )
}

export default Login
