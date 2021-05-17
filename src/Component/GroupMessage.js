import React,{useEffect,useState,useCallback} from 'react'
import axios from "axios"

import './css/groupMessage.css'
import Button from 'react-bootstrap/Button'
import base_url from "./api"



const GroupMessage = (props)=>{


  const [sender,setSender] = useState(props.sender)
  const [reciever,setReciever] = useState(props.reciever)
  const [text_message,setText_message] = useState("")
  const [sendBtn,setSendBtn] = useState(true)
  const [text_grp_name,settxt_grp_name] = useState("")
  const [text_grp_about,settxt_grp_about] = useState("")
  const [creat_grp_btn,setCreate_grp_btn] = useState(false)
  const [recentGrp,setRecentGrp] = useState([])
  const [groupInfo,setGrpInfo] =useState()
  const [grpMember,setGrpMember] = useState([])
  const [grpMessage,setGrpMessage] = useState([])

  const loadGrpMessage=useCallback(()=>{
    if(reciever)
    {
      axios({
               method: 'post',
               url: base_url+'/getGroupMessage',
               data: {group_id:reciever,
                      user_id:sender,
                    }

           })
           .then(
             (response) => {
              setGrpMessage(response.data)


   }, (error) => {
     console.log(error);

   }
   );
      axios.get(base_url+'/group/'+reciever)
            .then((response) => {

              setGrpInfo(response.data)
            });
      axios.get(base_url+'/groupMember/'+reciever)
                  .then((response) => {

                    setGrpMember(response.data)
                  });
    }
    axios.get(base_url+'/getUserGroup/'+sender)
          .then((response) => {
            setRecentGrp(response.data);

          });


  },[sender,reciever])

  useEffect(()=>{
    const id = setInterval(loadGrpMessage, 1000);
    return () => clearInterval(id);
  },[loadGrpMessage])


  const text_messageChange=(event)=>{
  setText_message(event.target.value)
  if(event.target.value==="")
      setSendBtn(true)
  else {
      setSendBtn(false)
    }
      }

  const update_txt_grp_name=(event)=>{
      settxt_grp_name(event.target.value)
      if(event.target.value==="" || text_grp_about=="" )
          setCreate_grp_btn(true)
      else {
          setCreate_grp_btn(false)
        }
          }

  const update_txt_grp_about=(event)=>{
              settxt_grp_about(event.target.value)
              if(event.target.value==="" || text_grp_name=="" )
                  setCreate_grp_btn(true)
              else {
                  setCreate_grp_btn(false)
                }
                  }

  const sendMessage=()=>{
    axios({
             method: 'post',
             url: base_url+'/sendGroupMessage',
             data: {group_id:reciever,
                    user_id:sender,
                  message:text_message}

         })
         .then(
           (response) => {
            setText_message("")
 }, (error) => {
   console.log(error);
      setText_message("")
 }
 );

  }


  const createGrp=()=>{
    axios({
             method: 'post',
             url: base_url+'/createGrp',
             data: {name:text_grp_name,
                    about:text_grp_about,
                    user_id:sender}

         })
         .then(
           (response) => {
            settxt_grp_name("")
            settxt_grp_about("")

 }, (error) => {
   console.log(error);

 }
 );
  }

  const selectGrp=(e)=>{
    setReciever(e)
    loadGrpMessage()
  }

  const profile=(e)=>{
    props.history.push({ pathname: '/profile', state: e })
  }

  const leaveGrp=()=>{
    axios({
             method: 'post',
             url: base_url+'/leaveGroup',
             data: {group_id:reciever,
                    user_id:sender}

         })
         .then(
           (response) => {
             props.history.push("/message")
 }, (error) => {
   console.log(error);

 }
 );
  }
  return (
    <div className='grpmsgContainer'>
      <div className='grprecent'>
        <div className='name_container' >
          <input type="text"  placeholder="Group Name" value={text_grp_name} onChange={update_txt_grp_name} className="mr-sm-2" style={{width:"100%",marginBottom:"0.5rem"}} />
          <input type="text"  placeholder="About" value={text_grp_about} onChange={update_txt_grp_about}  className="mr-sm-2" style={{width:"100%",marginBottom:"0.5rem"}} />
          <Button variant="primary" style={{width:"100%",marginBottom:"0.5rem"}} disabled={creat_grp_btn} onClick={createGrp}>Create</Button>
        </div>
      <div className='name_container'>
        <h5>Groups</h5>
      </div>
      {recentGrp.map((data)=>{
        return      <div className='name_container' className="button_container name_container" key={data.id} onClick={()=>selectGrp(data.id)}>
                <span>{data.name}</span>
              </div>
      })}


      </div>
      <div className='groupInfo'>
      <div className='name_container'>
        <h5>GroupInfo</h5>
      </div>
      {groupInfo && <div className='name_container'>
        <p>Group name: {groupInfo.name}</p>
        <p>Group Id&nbsp;&nbsp;: {groupInfo.id}</p>
        <p>Group Link&nbsp;&nbsp;: {base_url+"/group/"+groupInfo.id}</p>  </div>}
          {grpMember && grpMember.map((data)=>{
            return     <div className="button_container name_container"  key={data.user_id} onClick={()=>profile(data.user_id)}>
                      <img alt="" src={data.profile_pic} className='profile_pic'/>
                      &nbsp;&nbsp;{data.name}
                  </div>
          })}
          {groupInfo && <div style={{textAlign:"center",padding:"0.5rem"}}><Button variant="secondary" onClick={leaveGrp}>Leave</Button></div>}

      </div>


   <div className='grpmsgContent'>
     <div>
      <div className='grpchat_area'>
        {reciever && grpMessage.map((data)=>{
          return data.user1.user_id==sender?<div className="outgoing_msg" key={data.id}>
            <div className="sent_msg">
              <p>{data.message}</p>
               </div>
          </div>:<div className="incoming_msg" key={data.id}>
            <div className="received_msg">
              <div className="received_withd_msg">
                <img alt="" src={data.user1.profile_pic} className='profile_pic'/>
                <span> {data.message}</span>
              </div>
          </div>
        </div>
        })}



      </div>





      </div>
      <div className='send_area'>
      <input type="text"  placeholder="Type Here" value={text_message} onChange={text_messageChange} className="mr-sm-2" style={{width:"80%"}} />&nbsp;&nbsp;&nbsp;
      <Button variant="primary" disabled={sendBtn} onClick={sendMessage}>Send</Button>
        </div>
      </div>


</div>



  )
}
export default GroupMessage;
