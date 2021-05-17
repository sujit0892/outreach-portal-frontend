import React,{useEffect,useState} from 'react'
import './css/header.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import home from './icon/home.png'
import message from './icon/email.png'
import project from './icon/project-management.png'
import notification from './icon/bell.png'
import notification_1 from './icon/notification.png'
import profile from './icon/user.png'
import logout from './icon/logout.png'
import axios from "axios"
import base_url from "./api"


const Header = (props)=>
{


  const logoutCall=()=>{
    sessionStorage.clear();

  }


const [notStat,setnotStat] = useState(false)
let id = sessionStorage.getItem("id")
  useEffect(()=>{


    if(id)
{
  axios({
          method: 'post',
          url: base_url+'/getNotificationStat',
          headers: { "Content-Type": "text/plain" },
          data: id

      })
      .then(
        (response) => {
            if(response.data===1)
              setnotStat(true)
  }, (error) => {
  console.log(error);

  }
  );
}



},[id])


const [searchText,setSearchText] = useState("")
const [searchBtn,setSeacrhBtn] = useState(true)
const search = ()=>{
    props.history.push({pathname:"/search",state:searchText})
}

const searchChange = (e)=>{
  setSearchText(e.target.value)
  if(e.target.value==="")
      setSeacrhBtn(true)
  else {
    setSeacrhBtn(false)
  }
}


  return ( <Navbar expand="lg" variant="light" bg="white">
  <Container>
    <Navbar.Brand href="/home" className="heading"><span className="heading"><b>IIITB Outreach Portal</b></span></Navbar.Brand>




      <Nav className="mr-auto">
        <FormControl type="text" placeholder="Search" value={searchText} onChange={searchChange} className="mr-sm-2" />&nbsp;&nbsp;&nbsp;&nbsp;
        <Button  id="search" onClick={search} disabled={searchBtn}>Search</Button>
            <Nav.Link href="/home"><img src={home} className='icon' alt="home"></img></Nav.Link>
            <Nav.Link href="/message"><img src={message} alt="message" className='icon'></img></Nav.Link>
            <Nav.Link href="/project"><img src={project} className='icon' alt="project"></img></Nav.Link>
              <Nav.Link href="/profile"><img src={profile} className='icon' alt="profile"></img></Nav.Link>
                <Nav.Link href="/notification"><img src={notStat?notification_1:notification} className='icon' alt="notification"></img></Nav.Link>
                <Nav.Link href="/login" onClick={logoutCall}><img src={logout} className='icon' alt="notification"></img></Nav.Link>
          </Nav>

</Container>
</Navbar>

    )
}

export default Header;
