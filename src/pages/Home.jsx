import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../assets/admin.webp'
import ProjectCard from '../components/ProjectCard'
import Clint from '../components/Clint'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../services/allAPI'

function Home() {
  const [homeProjects,setHomeProjects] = useState([])

  const navigate = useNavigate()
  const [loginStatus,setLoginStatus] = useState(false)
  console.log(homeProjects);

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setLoginStatus(true)
    }else{
      setLoginStatus(false)
    }
  },[])

  const handleProjects =()=>{
    if(loginStatus){
      navigate('/projects')
    }else{
      toast.warning('please login to get full access to our projects!!!!')
    }
  }

  const getHomeProjects = async()=>{
    try {
      const result = await getHomeProjectsAPI()
      console.log(result);
      if(result.status==200){
        setHomeProjects(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className='w-100 d-flex justify-content-center align-items-center rounded border border-light' style={{minHeight:'100vh'}}>
        <div className='container'>
          <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 style={{fontSize:'80px'}} ><i class="fa-brands fa-docker"></i> Project Fair</h1>
            <p style={{textAlign:'justify'}}>One stop destination for all software Develpoment project. where user can add and manage their projects. as well access all project available in website... wath are you waiting for !!!</p>
           {
            loginStatus ?
            <Link to={'/dashboard'} className='btn btn-warning'> Manage Your Projects <i class="fa-solid fa-arrow-right"></i></Link>
          :
          <Link to={'/login'} className='btn btn-warning'> Starts to Explore <i class="fa-solid fa-arrow-right"></i></Link>
          }

          </div>
          <div className="col-lg-6">
            <img className='img-fluid' src={image} alt="" />
             </div>
            
          </div>
        </div>
      </div>

      <div className='mt-5'>
          <div className='text-center mb-5'>
            <h1>
              Explore our Project
            </h1>
            <marquee>
              <div className='d-flex'>
              {  
                homeProjects?.length>0 &&
                homeProjects?.map(project=>(
                <div key={project} className='me-5 mt-3'>
                  <ProjectCard displayData={project}/>
                </div>
                ))
                
              }
              </div>
            </marquee>
            <button onClick={handleProjects} className='btn btn-link mt-3'>Click here to view more project.....</button>
          </div>
          <ToastContainer position='top-center'theme='colored'autoClose={3000}/>
      </div>
      <Clint/>
    </>
  )
}

export default Home