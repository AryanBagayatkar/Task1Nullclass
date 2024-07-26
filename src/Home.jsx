import React,{useEffect} from 'react'
import{ useNavigate }from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:3005/home')
        .then(result => {console.log(result)
          if (result.data !== "Sucess") {
            navigate('/login')  
          }
    })
    .catch(err => console.log(err))  
  },[])
  return (
    <div>Home</div>
  )
}

export default Home