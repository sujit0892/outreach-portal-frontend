import React,{useEffect,useState} from 'react'
import axios from "axios"
import Header from './Header'
import './css/home.css'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import base_url from "./api"

const Notification = (props)=>{
  let id = sessionStorage.getItem("id")

  const [notifcations,setNotification] = useState([])
  const [hasNotification,setHasNotification] = useState(false)
    useEffect(()=>{


      if(!id)
        props.history.push('/login')

        axios({
                method: 'post',
                url: base_url+'/notification',
                headers: { "Content-Type": "text/plain" },
                data: id

            })
            .then(
              (response) => {
                  setNotification(response.data)
                  setHasNotification(true)

        }, (error) => {
        console.log(error);

        }
        );


                axios({
                        method: 'post',
                        url: base_url+'/uodateNotification',
                        headers: { "Content-Type": "text/plain" },
                        data: id

                    })
                    .then(
                      (response) => {
                }, (error) => {
                console.log(error);

                }
                );


  },[props.history,id])




  return <div><Header/>
<div className='bg'>
{hasNotification && notifcations.map((data)=>{
  return <div key={data.id}><Link to={{ pathname: '/viewPost', state: { post_id: data.pid} }}  className="post-click">
  <Card style={data.stat===0?{backgroundColor:"#eff7ff"}:{backgroundColor:"#ffffff"}} >
  <Card.Body>
  <Card.Text>&nbsp;&nbsp;{data.notification}</Card.Text>
  </Card.Body>
  </Card>
  </Link></div>
})}
</div>  </div>
}

export default Notification;
