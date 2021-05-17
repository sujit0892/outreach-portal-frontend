import React,{useEffect,useState,useCallback} from 'react'
import axios from "axios"

import './css/messages.css'
import Button from 'react-bootstrap/Button'
import base_url from "./api"



const SingleMessages=(props)=>{



  const [sender,setSender] = useState(props.sender)
  const [reciever,setReciever] = useState(props.reciever)

  const [info,setInfo] = useState({})
  const [ message,setMessage] = useState([])
  const [ recentMsg,setrecentMsg] = useState([])

  const loadMessage=useCallback(()=>{
    if(reciever)
    {

      axios({
               method: 'post',
               url: base_url+'/getMsg',
               data: {
                 user_id1:sender,
                 user_id2:reciever
               }

           })
           .then(
             (response) => {
               setMessage(response.data);



   }, (error) => {
     console.log(error);

   }
   );

   axios({
            method: 'post',
            url: base_url+'/recieveMessage',
            data: {
              user_id1:sender,
              user_id2:reciever
            }

        })
        .then(
          (response) => {

}, (error) => {
  console.log(error);

}
);

  }

    axios.get(base_url+'/getRecentMsg/'+sender)
          .then((response) => {
            setrecentMsg(response.data);

          });


},[sender,reciever])

  const loadProfile = useCallback(()=>{
    if(!reciever)
    console.log("key not found")
    else {

      axios({
               method: 'post',
               url: base_url+'/Profile',
               headers: { "Content-Type": "text/plain" },
               data: reciever

           })
           .then(
             (response) => {
               setInfo(response.data);


   }, (error) => {
     console.log(error);

   }
   );
  }
},[reciever])



  useEffect(()=>{
    loadProfile()
    const id = setInterval(loadMessage, 1000);
    return () => clearInterval(id);
  },[loadMessage,loadProfile,sender,reciever])


    const [text_message,setText_message] = useState("")
    const [sendBtn,setSendBtn] = useState(true)

    const text_messageChange=(event)=>{
      setText_message(event.target.value)
      if(event.target.value==="")
          setSendBtn(true)
      else {
        setSendBtn(false)
      }
    }

    const sendMessage=()=>{
      console.log(reciever)
      axios({
               method: 'post',
               url: base_url+'/sendMessage',
               data: {sender:sender,
                      reciever:reciever,
                      message:text_message}

           })
           .then(
             (response) => {
               setText_message("")

   }, (error) => {
     console.log(error);

   }
   );
    }

    const selectMsg=(e)=>{

      setReciever(e)
      loadProfile()
      loadMessage()
    }

    return (
      <div className='msgContainer'>
        <div className='recent'>
        <div className='name_container'>
          <h5>Recent</h5>
        </div>
        {recentMsg.map((data)=>{
          return     <div className="button_container name_container1" style={(data.msg.user1.user_id!=sender && data.msg.status==0)?{backgroundColor:"#5fbbd4"}:{backgroundColor:"#f8f8f8"}}  key={data.user.user_id} onClick={()=>selectMsg(data.user.user_id)}>
                    <img alt="" src={data.user.profile_pic} className='profile_pic'/>
                    &nbsp;&nbsp;{data.user.name}
                    <p style={{color:"#666666"}}>{data.msg.message}</p>
                </div>
        })}

        </div>


     <div className='msgContent'>
    {reciever && <div><div className='name_container'>
          <img alt="" src={info.profile_pic} className='profile_pic'/>
          &nbsp;&nbsp;{info.name}
        </div>
        <div className='chat_area'>
          {message.map((data)=>{
            return data.user1.user_id==sender?<div className="outgoing_msg" key={data.id}>
              <div className="sent_msg">
                <p>{data.message}</p>
                 </div>
            </div>:<div className="incoming_msg" key={data.id}>
              <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{data.message}</p>
                </div>
            </div>
        </div>
          })}




        </div>
        <div className='send_area'>
<input type="text"  placeholder="Type Here" value={text_message} onChange={text_messageChange} className="mr-sm-2" style={{width:"80%"}} />&nbsp;&nbsp;&nbsp;
  <Button variant="primary" disabled={sendBtn} onClick={sendMessage}>Send</Button>
    </div>
  </div>}</div>


      </div>
       );
}


export default SingleMessages;
