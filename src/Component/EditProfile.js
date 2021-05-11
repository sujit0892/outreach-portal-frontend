import React,{useEffect,useState,useRef} from 'react'
import Header from './Header'
import './css/home.css'
import axios from "axios"
import Card from 'react-bootstrap/Card'
import base_url from "./api"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'


const EditProfile=(props)=>{
  let id = sessionStorage.getItem("id")
  const [info,setInfo] = useState({})
  const [hasInfo,setHasInfo] = useState(false)

  useEffect(()=>{
    if(!id)
      props.history.push('/login')

      axios({
               method: 'post',
               url: base_url+'/Profile',
               headers: { "Content-Type": "text/plain" },
               data: id

           })
           .then(
             (response) => {
               setInfo(response.data);
               setHasInfo(true)
               console.log(response.data)
   }, (error) => {
     console.log(error);

   }
   );
 },[id,props])

const [imageAsFile, setImageAsFile] = useState('')
const ref = useRef();
const [profileBtn,setprofilebtn] =useState(true);
const fileChange = (event)=>
{
  const image = event.target.files[0]
  setImageAsFile(imageFile => (image))
    if(event.target.files[0]!=null)
    {
      setprofilebtn(false);
    }

}

  return <div><Header/>
  <div className="bg">
  <Card>
  <Card.Body>
  <Card.Text style={{textAlign:"center"}}><img alt="profile_pic" src={info.profile_pic} className='main-profile-pic'/></Card.Text>
  <Card.Title style={{textAlign:"center"}}>{info.name}</Card.Title><br></br>
  <table>
  <tr><td style={{width:"25%"}}>profile pic</td><td style={{width:"50%"}}><Form.File id="file1" ref={ref} onChange={fileChange} accept="image/*"/></td><td style={{width:"25%"}}>&nbsp;&nbsp;<Button disabled={profileBtn}>Save</Button></td></tr>
  <br></br><tr><td>Password</td><td><FormControl type="text" placeholder="Enter Password"  className="mr-sm-2" required />
  <FormControl type="text" placeholder="Confirm Password"  className="mr-sm-2" required /></td><td>&nbsp;&nbsp;<Button disabled={profileBtn}>Save</Button></td></tr>
  <br></br><tr><td>About</td><td><Form.Control as="textarea" rows={3}  placeholder="Enter About"  required /></td><td>&nbsp;&nbsp;<Button disabled={profileBtn}>Save</Button></td></tr>
  <br></br><tr><td>Interest</td><td><Form.Control as="textarea" rows={3}  placeholder="Enter interest"  required /></td><td>&nbsp;&nbsp;<Button disabled={profileBtn}>Save</Button></td></tr>


  </table>

  </Card.Body></Card>
  </div>
  </div>
}

export default EditProfile;
