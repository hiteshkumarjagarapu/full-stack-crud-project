import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './User.css'


function User() {
    const [users,setUsers]=useState([])
    

    useEffect(()=>{
        axios.get('http://localhost:8080/')
        .then(response => {setUsers(response.data)})
        .catch(error => {console.error('Error:', error);
  });

    },[])

    const dltData=(id)=>{
      axios.delete(`http://localhost:8080/deleteUser/${id}`)
      .then(res=>{console.log(res)
        setUsers(prev=>prev.filter(user=>user.id!==id));
      })
      
      .catch(err=>console.log(err))
    
    }
   

  return (
    <div className='d-flex justify-content-center align-items-center container-fluid bg'>
      
      <div className='w-50 bg-transparent  rounded p-3'>
        
      
      
      <Link to='/create' className='btn bt btn-success'>Add +</Link>
      
      
      <hr className='text-light'/>
        <table className='table-borderless  table-transparent table'>
            <thead  className='p-1 '>
                <tr >
                    <th className='text-light text-decoration-underline  bg-transparent'> NAME </th>
                    <th className='text-light text-decoration-underline  bg-transparent'> E-MAIL </th>
                    <th className='text-light text-decoration-underline  bg-transparent'> CRUD MODIFICATIONS </th> 
                </tr>
            </thead>
            
            <tbody >
                    {users.map((user,i) => {
                       return <tr   key={i}>
                            
                            <td className='text-white bg-transparent'>{user.name}</td>
                            <td className='text-white bg-transparent'>{user.email}</td>
                            <td className='bg-transparent'>
                            <Link to={`/update/${user.id}`} className='btn m-1 font-weight-bold btn-success border border-success bt'  type='submit'>Update</Link>

                            <button className='btn m-1 bt border border-danger btn-danger' onClick={(e)=>dltData(user.id)}>Delete</button>
                            </td>
                        </tr>
                        })
                        }

            </tbody>
        </table>
      </div>
    </div>

  )
}

export default User
