import React,{useState} from 'react'
import{ Link ,  useNavigate}from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handlesubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3005/login',{email,password})
        .then(result => {console.log(result)
        if(result.data === "Sucess"){
          navigate('/home')
        }      
    })
    .catch(err => console.log(err))  
    }
  return (
    <div className='container'>
        <div className="inner">
        <h3>Login</h3>
        <form onSubmit={handlesubmit}>
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
            <button type="submit">Login</button>
            <p>Create account
              <br />
              <Link to="/forgot">Forgot Password ?</Link>
            </p>
        </form>
        <Link to="/register">Register</Link>           
        </div>
    </div>
  )
}

export default Login
