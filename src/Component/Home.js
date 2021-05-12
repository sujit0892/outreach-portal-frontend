import React,{useEffect,useState,useRef} from 'react'
import axios from "axios"
import Header from './Header'
import './css/home.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {storage} from './firebase/firebase'
import Post from './Post'
import {Link} from 'react-router-dom'
import base_url from "./api"


const Home = (props)=>{

const [allPost,setAllPost] = useState([])
const [getPost,setgetPost] = useState(false)
let id = sessionStorage.getItem("id")
  useEffect(()=>{


    if(!id)
      props.history.push('/login')

    axios.get(base_url+'/getAllPost')
        .then((response) => {
          setAllPost(response.data);
          setgetPost(true)


        });


},[props.history,id])

  const [postField,setPostField] = useState("");

  const [imageAsFile, setImageAsFile] = useState('')


  const [postbtn,setpostbtn] = useState(true);
  const ref = useRef();

  const fileChange = (event)=>
  {
    const image = event.target.files[0]
    setImageAsFile(imageFile => (image))
      if(event.target.files[0]!=null)
      {
        setpostbtn(false);
      }

  }

  const postChange =(event)=>
  {
    setPostField(event.target.value)
    if(event.target.value!=="")
    {
      setpostbtn(false)
    }
    else {
      setpostbtn(true)
    }
  }


  const createPost=(event)=>
  {

        // async magic goes here...
        if(imageAsFile === '') {
          console.log("go");
          axios({
                  method: 'post',
                  url: base_url+'/createPost',
                  data: {
                    post:postField,
                    pic: null,
                    isProject: 0,
                    course_id:0,
                    user_id:id

                  }

              })
              .then(
                (response) => {
                    window.location.reload();
      }, (error) => {
        console.log(error);

      }
      );
        }
        else{
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
                     url: base_url+'/createPost',
                     data: {
                       post:postField,
                       pic: fireBaseUrl,
                       isProject: 0,
                       course_id:0,
                       user_id:id

                     }

                 })
                 .then(
                   (response) => {
                       window.location.reload();
         }, (error) => {
           console.log(error);

         }
         );
           })
        })
}


        }


  const clearPost=(event)=>
  {
    setPostField("")
    ref.current.value=""
    setpostbtn(true)
    console.log(allPost);
  }




  return(<div><Header history={props.history}/>
  <div className="bg">
    <Card className="cards">
      <Card.Body>
        <Card.Title>Create Post</Card.Title>
        <Form.Control as="textarea" rows={3} value={postField}  onChange={postChange}/>
        <Form.File id="file1" ref={ref} onChange={fileChange} accept="image/*"/>
        <br></br>
        <Button id="post" onClick={createPost} disabled={postbtn}>Post</Button>&nbsp;&nbsp;
        <Button id="cancel" onClick={clearPost} >Clear</Button>
      </Card.Body>
    </Card>

{getPost && allPost.map((data)=>{
      return <div key={data.post_id}><br></br><Link to={{ pathname: '/viewPost', state: { post_id: data.post_id} }}  className="post-click" ><Post id={data.post_id} username={data.user.name} profile_pic={data.user.profile_pic} post ={data.post} pic={data.pic} /></Link></div>
    })}
</div></div>
    );
}


export default Home;
