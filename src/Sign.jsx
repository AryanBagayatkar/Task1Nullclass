import React,{useState} from 'react'
import{ Link , Navigate, useNavigate}from 'react-router-dom'
import axios from 'axios'

const Sign = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handlesubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3005/register',{name,email,password})
        .then(result => {console.log(result)
        navigate('/login')      
    })
    .catch(err => console.log(err))  
    }
  return (
    <div className='container'>
        <div className="inner">
        <h3>Register</h3>
        <form onSubmit={handlesubmit}>
            <div className="formin">
            <label htmlFor="email">
                <strong>Name</strong>
            </label>
            <input type="text" placeholder='Enter Name' autoComplete='off' name='email'  onChange={(e)=> setName(e.target.value)} />
            </div>
            <div className="formin">
            <label htmlFor="email">
                <strong>Email</strong>
            </label>
            <input type="text" placeholder='Enter Email' autoComplete='off' name='email' onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="formin">
            <label htmlFor="email">
                <strong>Password</strong>
            </label>
            <input type="text" placeholder='Enter Password' autoComplete='off' name='password' onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <button type="submit">Register</button>
            <p>Already have account</p>
        </form>
        <Link to="/login">Login</Link>           
        </div>
    </div>
  )
}

export default Sign
