import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import profilimg from '../assets/profilimg.jpg'
import { SERVER_URL } from '../services/serverUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfileAPI } from '../services/allAPI';
function Profile() {
  const [preview,setPreview] = useState("")
  const [existingImg,setExistingImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profileImage:""
  })
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const existingUserDetails = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({
        ...userDetails,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,linkedin:existingUserDetails.linkedin,
      })
      setExistingImg(existingUserDetails.profile)
    }
  },[open])

  useEffect(()=>{
    if(userDetails.profileImage){
      setPreview(URL.createObjectURL(userDetails.profileImage))
    }else{
      setPreview("")
    }
  },[userDetails.profileImage])

  const handleUpdateProfile = async()=>{
    const {username,email,password,github,linkedin,profileImage} = userDetails
    if(!github || !linkedin){
      toast.warning("please fill the form completely!!!")
    }else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
     preview? reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImg)
     const token = sessionStorage.getItem("token")
     if(token){
      const reqHeader={
        "Content-Type" : preview?"multipart/form-data":"application/json",
        "Authorization" : `Bearer ${token}`
      }
      //call API 

     try {
      const result = await updateProfileAPI(reqBody,reqHeader)
      if(result.status==200){
        setOpen(!open)
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
      }else{
        console.log(result);
        
      }
     } catch (err) {
      console.log(err);
      
     }
     }
    }
  }

  return (
    <>
        <div className="d-flex justify-content-between">
          <h3 className='text-warning'>User Profile</h3>
          <button onClick={()=> setOpen(!open)} className='btn'><i class="fa-solid fa-angle-down"></i></button>
        </div>
        <Collapse in={open}>
        <div className='row justify-content-center align-items-center shadow rounded p-3'>
           <label className='text-center'> 
            <input onChange={e=>setUserDetails({...userDetails,profileImage:e.target.files[0]})} type="file" style={{display:'none'}} />
          {  
            existingImg=="" ?
            <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:profilimg} alt="" />
          :
          <img width={'200px'} height={'200px'} className='rounded-circle' src={ preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="" />
          }
            </label>
            <div className="mb-3 mt-3">
              <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text" className='form-control' placeholder='Github URL' />
            </div>
            <div className="mb-3">
              <input  value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text" className='form-control' placeholder='LinkedIn URL' />
            </div>
            <div className="d-grid">
              <button onClick={handleUpdateProfile} className="btn btn-warning">Update Profile</button>
            </div>

        </div>
      </Collapse>
     
    </>
  )
}

export default Profile