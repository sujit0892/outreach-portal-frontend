import React,{useEffect,useState,useRef} from 'react'
import Header from './Header'
import './css/home.css'
import axios from "axios"
import Card from 'react-bootstrap/Card'
import base_url from "./api"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {storage} from './firebase/firebase'


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

   }, (error) => {
     console.log(error);

   }
   );
 },[id,props])

const [imageAsFile, setImageAsFile] = useState('')
const ref = useRef();
const [profileBtn,setprofilebtn] =useState(true);
const [password,setPassword] = useState("")
const [c_password,setcPassword] = useState("")
const [pwdBtn,setPwdBtn] = useState(true)
const [pwdMatch,setPwdMatch] = useState(true)
const [about,setAbout] = useState("")
const [aboutBtn,setAboutBtn] = useState(true)
const [interest,setInterest] = useState("")
const [interestBtn,setInterestBtn] = useState(true)

const interestChange=(event)=>{
  setInterest(event.target.value)
  if(event.target.value==="")
    setInterestBtn(true)
  else {
    setInterestBtn(false)
  }
}

const aboutChange=(event)=>{
  setAbout(event.target.value)
  if(event.target.value==="")
    setAboutBtn(true)
  else {
    setAboutBtn(false)
  }
}

const pwdChange = (event)=>{

  setPassword(event.target.value)
  if(c_password!==event.target.value)
      setPwdMatch(false)
  else {
    setPwdMatch(true)
  }
  if(c_password!=="" && event.target.value!=="" && c_password===event.target.value)
      setPwdBtn(false)
  else {
    setPwdBtn(true)
  }
}

const c_pwdChange = (event)=>{
  setcPassword(event.target.value)
  if(password!==event.target.value)
      setPwdMatch(false)
    else {
      setPwdMatch(true)
    }
  if(password!=="" && event.target.value!=="" && password===event.target.value)
      setPwdBtn(false)
  else {
    setPwdBtn(true)
  }
}


const fileChange = (event)=>
{
  const image = event.target.files[0]
  setImageAsFile(imageFile => (image))
    if(event.target.files[0]!=null)
    {
      setprofilebtn(false);
    }
    else {
      setprofilebtn(true);
    }

}

const changeProfilePic=()=>{
  const filename = Date.now()+imageAsFile.name;
  console.log(filename);
  const uploadTask = storage.ref(`/images/${filename}`).put(imageAsFile)
  //initiates the firebase side uploading
  uploadTask.on('state_changed',
  (snapShot) => {
    //takes a snap shot of the process as it is happening
    console.log(snapShot)
  }, (err) => {
    //catches the errors
    console.log(err)
  }, () => {
    // gets the functions from storage refences the image storage in firebase by the children
    // gets the download url then sets the image from firebase as the value for the imgUrl key:
    storage.ref('images').child(filename).getDownloadURL()
     .then(fireBaseUrl => {
       axios({
               method: 'post',
               url: base_url+'/updateProfilePic',
               data: {
                 user_id:id,
                 value:fireBaseUrl

               }

           })
           .then(
             (response) => {
                 props.history.push('/profile')
   }, (error) => {
     console.log(error);

   }
   );
     })
  })
}

const changePassword=()=>{
  axios({
          method: 'post',
          url: base_url+'/updatePassword',
          data: {
            user_id:id,
            value:password

          }

      })
      .then(
        (response) => {
            props.history.push('/profile')
}, (error) => {
console.log(error);

}
);
}

const updateInterest=()=>{
  axios({
          method: 'post',
          url: base_url+'/updateInterest',
          data: {
            user_id:id,
            value:interest

          }

      })
      .then(
        (response) => {
            props.history.push('/profile')
}, (error) => {
console.log(error);

}
);
}

const updateAbout=()=>{
  axios({
          method: 'post',
          url: base_url+'/updateAbout',
          data: {
            user_id:id,
            value:about

          }

      })
      .then(
        (response) => {
            props.history.push('/profile')
}, (error) => {
console.log(error);

}
);
}


  return <div><Header/>
  <div className="bg">
  <Card>
  <Card.Body>
  <Card.Text style={{textAlign:"center"}}><img alt="profile_pic" src={info.profile_pic} className='main-profile-pic'/></Card.Text>
  <Card.Title style={{textAlign:"center"}}>{info.name}</Card.Title><br></br>
  <table>
  <tr><td style={{width:"25%"}}>profile pic</td><td style={{width:"50%"}}><Form.File id="file1" ref={ref} onChange={fileChange} accept="image/*"/></td><td style={{width:"25%"}}>&nbsp;&nbsp;<Button disabled={profileBtn} onClick={changeProfilePic}>Save</Button></td></tr>
  <br></br><tr><td>Password</td><td>{!pwdMatch && "Password didn't match"}<FormControl type="password" placeholder="Password" value={password} onChange={pwdChange} className="mr-sm-2" required />
  <FormControl type="password" placeholder="Confirm Password" value={c_password} onChange={c_pwdChange} className="mr-sm-2" required /></td><td>&nbsp;&nbsp;<Button disabled={pwdBtn} onClick={changePassword}>Save</Button></td></tr>
  <br></br><tr><td>About</td><td><Form.Control as="textarea" rows={3}  placeholder="Enter About" value={about} onChange={aboutChange} required /></td><td>&nbsp;&nbsp;<Button disabled={aboutBtn} onClick={updateAbout}>Save</Button></td></tr>
  <br></br><tr><td>Interest</td><td><Form.Control as="textarea" rows={3}  placeholder="Enter interest" value={interest} onChange={interestChange} required /></td><td>&nbsp;&nbsp;<Button disabled={interestBtn} onClick={updateInterest}>Save</Button></td></tr>


  </table>

  </Card.Body></Card>
  </div>
  </div>
}

export default EditProfile;
