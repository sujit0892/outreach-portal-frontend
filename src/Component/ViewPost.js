import React,{useEffect,useState} from 'react'
import axios from "axios"
import './css/home.css'
import Post from './Post'
import Header from './Header'
import Card from 'react-bootstrap/Card'
import base_url from "./api"
import Button from 'react-bootstrap/Button'

const ViewPost = (props)=>{

  let post_id = ""
  let id = sessionStorage.getItem("id")
  try{
      post_id = props.location.state
  }catch{
    props.history.push("/home")
  }

  const [comment,setComment] = useState("")
  const [post,setPost] = useState({})
  const [hasPost,sethasPost] = useState(false)
  const [postComments,setpostComment] = useState({})
  const [hasComment,sethasComment] = useState(false)


  useEffect(()=>{
    if(!id)
      props.history.push('/login')
    if(!post_id)
      props.history.push("/home")

      axios({
        method: 'post',
        url: base_url+'/viewPost',
        headers: { "Content-Type": "text/plain" },
        data: post_id.post_id

    })
    .then(
      (response) => {
        setPost(response.data)
        sethasPost(true)
}, (error) => {
console.log(error);

}
);

axios.get(base_url+'/getComment/'+post_id.post_id)
    .then((response) => {
      setpostComment(response.data);
      sethasComment(true);

    });

},[post_id,id,props,sethasPost])


const commentChange=(e)=>{
  setComment(e.target.value)
}
const commentPost=()=>{
  axios({
    method: 'post',
    url: base_url+'/commentPost',
    data: {user_id:id,
      post_id:parseInt(post_id.post_id),
      comment:comment}

})
.then(
  (response) => {
    console.log(response.status)
    window.location.reload();
}, (error) => {
console.log(error);

}
);
}



  return (<div><Header/><div className="bg">
  {hasPost?<Post username={post.user.name} profile_pic={post.user.profile_pic} post={post.post} pic={post.pic}/>:""}
<Card>
  <Card.Body>
  <Card.Text style={{textAlign:"center"}}>
<input type="text" value={comment} onChange={commentChange} placeholder="Comment" className="mr-sm-2" style={{width:"80%"}} />&nbsp;&nbsp;&nbsp;<Button variant="primary" onClick={commentPost}>Comment</Button>
</Card.Text></Card.Body></Card>
{hasComment && postComments.map((comments)=>{
  return <Post key={comments.id} username={comments.user.name} profile_pic={comments.user.profile_pic} post={comments.comment} pic={null}/>
})}
  </div>


</div>)
}

export default ViewPost
