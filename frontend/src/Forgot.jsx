import React,{useState} from 'react'
import{ useNavigate}from 'react-router-dom'
import axios from 'axios'

const Forgot = () => {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
     axios.defaults.withCredentials = true; 
    const handlesubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3005/forgot',{email})
        .then(result => {console.log(result)
        if(result.data === "Sucess"){
          navigate('/login')
        }      
    })
    .catch(err => console.log(err))  
    }
  return (
    <div className='container'>
        <div className="inner">
        <h3>Forgot Password</h3>
        <form onSubmit={handlesubmit}>
            <div className="formin">
            <label htmlFor="email">
                <strong>Email</strong>
            </label>
            <input type="text" placeholder='Enter Email' autoComplete='off' name='email' onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <button type="submit">Send</button>
        </form>         
        </div>
    </div>
  )
}

export default Forgot
