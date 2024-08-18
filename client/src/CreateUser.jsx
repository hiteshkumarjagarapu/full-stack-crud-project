import React,{useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './CreateUser.css'


function CreateUser() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [err,setErr]=useState(true)
    
    const navigate=useNavigate()

    const Submit=(e)=>{
        e.preventDefault();
        if(name==="" || email===""){
          setErr(!err)
          console.log("Name and Email Fields Can't be Empty!!!")
          return;
        }
        
        axios.post("http://localhost:8080/createUser",{name,email})
        .then(res=>console.log(res))
        navigate('/')
        .catch(err=>console.log(err))


    }
  return (
    <div className=' vh-100 bg2'>
      <div className="text-center p-2 ">
      <img className="border rounded-4" src="https://cdn-icons-png.flaticon.com/512/9775/9775776.png"  width={200} height={220}/>
      </div>
      
      <div className="d-flex justify-content-center align-items-center ">
      
      
      
      <div className='w-50 bg-transparent border border-light box rounded-4 p-3'>
      
        <form onSubmit={Submit}>
            <h2 className=" text-center text-white">Add User</h2>
            <div className='mb-3 p-2'>
                <label htmlFor='name' className=" text-white fw-bold" >Name :</label>
                <input placeholder="Enter Name" value={name} id='name' type='text' className='  form-control' onChange={(e)=>setName(e.target.value)}/>
                
            </div>
            <div className='mb-3 p-2'>
                <label htmlFor='email' className=" text-white fw-bold">E-mail :</label>
                <input placeholder="Enter Email"  value={email} id='email' type='email' className= ' form-control' onChange={(e)=>setEmail(e.target.value)}/>
                
            </div>
            
            <div className="text-center">
            {!err && <p className="text-danger">Name and Email Fields cant'b be Empty!!</p>}
            
            </div >
            <button type="submit" className='btn p-2 mt-3 btn-success'>Submit</button>
        </form>

      </div>
      </div>
    </div>
  )
}

export default CreateUser
