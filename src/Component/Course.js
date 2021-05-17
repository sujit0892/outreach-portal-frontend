import React,{useEffect,useState,useRef} from 'react'
import Header from './Header'
import './css/home.css'
import axios from "axios"
import Card from 'react-bootstrap/Card'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import base_url from "./api"
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {storage} from './firebase/firebase'
import Post from './Post'

const Course=(props)=>{
  const [allPost,setAllPost] = useState([])
  const [getPost,setgetPost] = useState(false)
  let id = sessionStorage.getItem("id")
  let course_id = props.match.params.id
  const [course,setCourse] = useState({})
  const [courseIns,setCourseIns] = useState([])
  const [isIns,setIns] = useState(false)
  const [role,setRole] = useState(false);
  const [projects,setProject] = useState([])
  const [hasProject, setHasProject] = useState(false)
  useEffect(()=>{

        if(!id || !course_id)
          props.history.push('/login')

        axios.get(base_url+'/course/'+course_id)
            .then((response) => {
                setCourse(response.data)

            });

        axios.get(base_url+'/getCourseInstructor/'+course_id)
                .then((response) => {
                    setCourseIns(response.data)
                    for(var i=0;i<response.data.length;i++)
                    {
                      if(response.data[i].user_id==id)
                      {
                        setIns(true)
                        setRole(true)
                      }

                    }
                });

        axios.get(base_url+'/getCoursePost/'+course_id)
                    .then((response) => {
                      setAllPost(response.data);
                      setgetPost(true)


                    });

      axios.get(base_url+'/getCourseProject/'+course_id)
                                .then((response) => {
                                  setHasProject(true)
                                  setProject(response.data)


                                });
  },[id,course_id])

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
                    course_id:course_id,
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
                       course_id:course_id,
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


  //project
  const [projectpostField,setprojectPostField] = useState("");
  const [title,setTitle] = useState("");

  const [projectimageAsFile, setprojectImageAsFile] = useState('')

  const [projectpostbtn,setprojectpostbtn] = useState(true);
  const projectref = useRef();

  const projectfileChange = (event)=>
  {
    const image = event.target.files[0]
    setprojectImageAsFile(imageFile => (image))
      if(event.target.files[0]!=null)
      {
        setprojectpostbtn(false);
      }

  }

  const projectpostChange =(event)=>
  {
    setprojectPostField(event.target.value)
    if(event.target.value!=="" && title!=="")
    {
      setprojectpostbtn(false)
    }
    else {
      setprojectpostbtn(true)
    }
  }

  const projectchangeTitle =(event)=>
  {
    setTitle(event.target.value)
    if(event.target.value!=="" && projectpostField!=="")
    {
      setprojectpostbtn(false)
    }
    else {
      setprojectpostbtn(true)
    }
  }


  const projectcreatePost=(event)=>
  {

        // async magic goes here...
        if(projectimageAsFile === '') {
          console.log("go");
          axios({
                  method: 'post',
                  url: base_url+'/createPost',
                  data: {
                    post:projectpostField,
                    pic: null,
                    isProject: 1,
                    course_id:course_id,
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
                            course_id:course_id


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
        const filename = Date.now()+projectimageAsFile.name;
        const uploadTask = storage.ref(`/images/${filename}`).put(projectimageAsFile)
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
                       post:projectpostField,
                       pic: fireBaseUrl,
                       isProject: 1,
                       course_id:course_id,
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
                               course_id:course_id


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


  const projectclearPost=(event)=>
  {
    setprojectPostField("")
    projectref.current.value=""
    setprojectpostbtn(true)

  }



  return (<div><Header history={props.history}/>
    <div className="bg">
    <Card>
    <Card.Body>
    <Card.Title>{course.course_id} {course.name}</Card.Title>
    <Card.Text>Course Instructor: {courseIns.map((data)=>{
      return <span key={data.user_id}><Link to={{ pathname: '/profile', state: data.user_id }}>{data.name}</Link>&nbsp;</span>
    })}</Card.Text>
    </Card.Body>
    </Card>

    <Tabs defaultActiveKey="post" id="uncontrolled-tab-example">
    <Tab eventKey="post" title="Post">
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

    </Tab>
    <Tab eventKey="project" title="Project">
    {role && <Card className="cards">
      <Card.Body>
        <Card.Title>Create project Post</Card.Title>
        <Form.Group>
        <FormControl type="text" placeholder="Enter Title" value={title} onChange={projectchangeTitle} className="mr-sm-2" required /><br></br>
        <Form.Control as="textarea" rows={3} value={projectpostField} placeholder="Enter text"  required onChange={projectpostChange}/><br></br>
        <Form.File id="file1" ref={projectref} onChange={projectfileChange} accept="image/*"/>
        <br></br>
        <Button id="post" onClick={projectcreatePost} disabled={projectpostbtn}>Post</Button>&nbsp;&nbsp;
        <Button id="cancel" onClick={projectclearPost} >Clear</Button></Form.Group>
      </Card.Body>
    </Card>}
    {hasProject && projects.map((p)=>{
      return <div key={p.id}><br></br><Link to={{ pathname: '/viewPost', state: { post_id: p.post.post_id} }}  className="post-click" ><Card><Card.Body><Card.Title>{p.title}</Card.Title></Card.Body></Card></Link></div>
    })}


    </Tab>

      </Tabs>





  </div></div>)
}


export default Course;
