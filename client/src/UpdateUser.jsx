import React, { useEffect,useState } from 'react'

import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import './UpdateUser.css'

function UpdateUser() {
  
  const {id}=useParams();
  const navigate=useNavigate()
  
  const [name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[err,setErr]=useState(true)


  useEffect(()=>{
    
    axios.get(`http://localhost:8080/getUser/${id}`)
    .then(res=>{
      console.log(res)
      
      setName(res.data.name)
      setEmail(res.data.email)
    })
    
    .catch(err=>console.log(err))
  },[])

  const Submit=(e)=>{
    e.preventDefault();
    if(name==="" || email===""){
      setErr(!err)
      return;
    }
        axios.put(`http://localhost:8080/updateUser/${id}`,{name,email})
        .then(res=>console.log(res))
        navigate('/')
        .catch(err=>console.log(err))

  }
 

  return (
    <div className=' vh-100 bg3'>
      <div className=' text-center p-4 mb-2'>
        <img className='border box1 rounded-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9IrAgzz7jTmEIVY-2yKHhiwBNg2foqiNvXTOlf9odU7MenW902tXltNAb9Ka1GojAmU4&usqp=CAU" height={200} width={180}/>
      </div>

      <div className='d-flex justify-content-center align-items-center'>
      <div className='w-50 bg-transparent border box1 rounded-4  p-3 '>
        <form onSubmit={Submit}>
            <h2 className='text-center text-white mb-3 '>Update User</h2>
            <div className='mb-3 p-2'>
                <label htmlFor='name' className='fw-bold text-white'>Name :</label>
                <input id='name' type='text' placeholder='Enter Name' className='form-control' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='mb-3 p-2'>
                <label htmlFor='email' className='fw-bold text-white'>E-mail :</label>
                <input id='email' type='email' placeholder='Enter Email' value={email} className='form-control'  onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='text-center'>
              {!err && <p className="text-danger">Name and Email Fields cant'b be Empty!!</p>}

            </div>
            <button type="submit" className='btn mt-2 btn-success'>Submit</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default UpdateUser
