import React from 'react'
import './css/home.css'
import Card from 'react-bootstrap/Card'


const Post=(props)=>{

  return(<div >
        <Card className='cards' >
        <Card.Body>
        <Card.Title><img alt="" src={props.profile_pic} className='profile-pic'/>
        &nbsp;&nbsp;{props.username}</Card.Title>
      <Card.Text style={{whiteSpace:"pre-line"}}>{props.post}<br></br><br></br></Card.Text>
        {props.pic!==null && <Card.Text style={{textAlign:"center"}}>
        <img alt="" src={props.pic} className='post_pic'/>
        </Card.Text>}
        </Card.Body></Card></div>)


}


export default Post;
