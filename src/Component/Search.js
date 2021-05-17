import React,{useEffect,useState} from 'react'
import Header from './Header'
import axios from "axios"
import base_url from "./api"
import './css/home.css'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

const Search = (props)=>{

  let key = props.location.state
  let id = sessionStorage.getItem("id")
  const [searchResult,setSearchResult] = useState([])
  const [hasResult,setHasResult] = useState(false)

  useEffect(()=>{
    if(!id)
      props.history.push('/login')
    if(!key)
      props.history.push("/home")
    axios.get(base_url+'/Search/'+key)
          .then((response) => {
            setSearchResult(response.data);
            console.log(response.data);
            setHasResult(true)
          });



  },[id,key,props.history])
  return <div><Header history={props.history} />
  <div className='bg' style={{paddingLeft:"30rem",paddingRight:"30rem"}}>
  {hasResult && searchResult.map((data)=>{
          return <div key={data.user_id}><br></br><Link to={{ pathname: '/profile', state: data.user_id }}  className="post-click" >
            <Card >
            <Card.Body>
            <Card.Title><img alt="" src={data.profile_pic} className='profile-pic'/>
            &nbsp;&nbsp;{data.name}</Card.Title></Card.Body></Card >
          </Link></div>
        })}
  </div>
  </div>
}

export default Search;
