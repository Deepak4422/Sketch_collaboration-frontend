import React from 'react'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [sign, setSign]=useState({pin:""})
    const navigate=useNavigate();

    
    const onsubmit=async (e)=>{
        
   e.preventDefault();
   const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({pin:sign.pin}),
          });
          const json=await response.json();
          console.log(json);
          if(json.success)
          {
            localStorage.setItem("token", json.authtoken);
            navigate("/");
           
          }
         


    }
    const onchange=(e)=>{
      setSign({[e.target.id]:e.target.value})
    }
  return (
    <div className="container">
        <form  onSubmit={onsubmit} >
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Set the pin</label>
    <input type="text" className="form-control" onChange={onchange} id="pin" aria-describedby="emailHelp"/>
  </div>
 
  
  <button   type="submit" className="btn btn-primary">Submit</button>
</form>
     
    </div>
  )
}

export default Signup
