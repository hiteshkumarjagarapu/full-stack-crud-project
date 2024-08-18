import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import User from './User'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import './App'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='no-body'>
        <Router>
          <Routes>
            <Route path='/' element={<User />}></Route>
            <Route path='/create' element={<CreateUser/>}></Route>
            <Route path='/update/:id' element={<UpdateUser/>}></Route>
            
            
          </Routes>
        </Router>
    </div>
  )
}

export default App
