import React,{useEffect,useState,useRef} from 'react'
import Header from './Header'
import './css/home.css'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from "axios"
import {storage} from './firebase/firebase'
import {Link} from 'react-router-dom'
import base_url from "./api"

const Project=(props)=>{
  const [postField,setPostField] = useState("");
  const [title,setTitle] = useState("");

  const [imageAsFile, setImageAsFile] = useState('')
  const [projects,setProject] = useState([])
  const [hasProject, setHasProject] = useState(false)

  const [postbtn,setpostbtn] = useState(true);
  const ref = useRef();
  const [role,setRole] = useState(false);
  let id = sessionStorage.getItem("id")

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
               setRole(response.data.role)
   }, (error) => {
     console.log(error);

   }
   );
   axios({
            method: 'get',
            url: base_url+'/project',


        })
        .then(
          (response) => {
            setHasProject(true)
            setProject(response.data)

}, (error) => {
  console.log(error);

}
);


},[props.history,id])

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
    if(event.target.value!=="" && title!=="")
    {
      setpostbtn(false)
    }
    else {
      setpostbtn(true)
    }
  }

  const changeTitle =(event)=>
  {
    setTitle(event.target.value)
    if(event.target.value!=="" && postField!=="")
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
                    isProject: 1,
                    course_id:0,
                    user_id:id

                  }

              })
              .then(
                (response) => {
                  axios({
                          method: 'post',
                          url: base_url+'/project',
                          data: {
                            title:title,
                            post_id:response.data,
                            course_id:0


                          }

                      })
                      .then(
                        (response) => {
                            window.location.reload();
              }, (error) => {
                console.log(error);

              }
              );
      }, (error) => {
        console.log(error);

      }
      );

        }
        else{
        const filename = Date.now()+imageAsFile.name;
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
                       isProject: 1,
                       course_id:0,
                       user_id:id

                     }

                 })
                 .then(
                   (response) => {
                     axios({
                             method: 'post',
                             url: base_url+'/project',
                             data: {
                               title:title,
                               post_id:response.data,
                               course_id:0


                             }

                         })
                         .then(
                           (response) => {
                               window.location.reload();
                 }, (error) => {
                   console.log(error);

                 }
                 );
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

  }

  console.log(projects);

    return (<div><Header/>
      <div className='bg'>
      {role && <Card className="cards">
        <Card.Body>
          <Card.Title>Create project Post</Card.Title>
          <Form.Group>
          <FormControl type="text" placeholder="Enter Title" value={title} onChange={changeTitle} className="mr-sm-2" required /><br></br>
          <Form.Control as="textarea" rows={3} value={postField} placeholder="Enter text"  required onChange={postChange}/><br></br>
          <Form.File id="file1" ref={ref} onChange={fileChange} accept="image/*"/>
          <br></br>
          <Button id="post" onClick={createPost} disabled={postbtn}>Post</Button>&nbsp;&nbsp;
          <Button id="cancel" onClick={clearPost} >Clear</Button></Form.Group>
        </Card.Body>
      </Card>}

      {hasProject && projects.map((p)=>{
        return <div key={p.id}><br></br><Link to={{ pathname: '/viewPost', state: { post_id: p.post.post_id} }}  className="post-click" ><Card><Card.Body><Card.Title>{p.title}</Card.Title></Card.Body></Card></Link></div>
      })}
      </div>    </div>)
}


export default Project;
