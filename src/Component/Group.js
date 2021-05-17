import React,{useEffect} from 'react'
import axios from "axios"
import base_url from "./api"
const Group=(props)=>{
  let group_id= props.match.params.id
  let id = sessionStorage.getItem("id")
  useEffect(()=>{
    if(!id || !group_id)
      props.history.push('/login')
      axios({
               method: 'post',
               url: base_url+'/addGroupMemebr',
               data: {group_id:group_id,
                      user_id:id}

           })
           .then(
             (response) => {
               props.history.push("/message")
   }, (error) => {
     console.log(error);

   }
   );
  },[])

  return (<div>group</div>);
}

export default Group;
