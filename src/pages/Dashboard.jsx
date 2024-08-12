import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'

function Dashboard() {
 const [displayName,setDisplayName]=useState("")


 useEffect(()=>{
  if(sessionStorage.getItem("existingUser")){
    const {username} = JSON.parse(sessionStorage.getItem("existingUser"))
    setDisplayName(username)
  }else{
    setDisplayName("")
  }
 },[])

  return (
      <>
        <Header insideDashBoard={true}/>
        <div style={{marginTop:'100px'}} className="container-fluid">
          <h1>Wlecome <span style={{color:'yellowgreen'}}>{displayName}</span></h1>
          <div className="row mt-5">
            <div className="col-lg-8 rounded">
              <View/>
            </div>
            <div className="col-lg-4 rounded">
              <Profile/>
            </div>
          </div>
        </div>
      </>
  )
}

export default Dashboard