import React,{useEffect,useState,useRef} from 'react'
import Header from './Header'
import './css/home.css'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import SingleMessage from './SingleMessages'
import GroupMessage from './GroupMessage'


const Messages=(props)=>{

  let key = props.location.state
  let id = sessionStorage.getItem("id")
  useEffect(()=>{
    if(!id)
      props.history.push('/login')

  },[id,props])

  return (<div><Header history={props.history}/>
    <Tabs defaultActiveKey="Message" id="uncontrolled-tab-example">
  <Tab eventKey="Message" title="Message">
    <SingleMessage sender={id} reciever={key}/>
  </Tab>
  <Tab eventKey="GroupMessage"  title="GroupMessage">
    <GroupMessage sender={id} history={props.history} />
  </Tab>
</Tabs>
    </div>)
}

export default Messages;
