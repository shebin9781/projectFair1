import React, { useContext, useEffect, useState } from 'react'
import Edit from '../components/Edit'
import Add from './Add'
import { getUserProjectsAPI, removeProjectAPI } from '../services/allAPI';
import { addResponseContext, editResponesContext } from '../contexts/ContextAPI';

function View() {
  const {editResponse,setEditResponse} =  useContext(editResponesContext)
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [userProjects,setUserProjects] = useState([])
  console.log(userProjects);

  useEffect(() => {
    getUserprojects()
  }, [addResponse,editResponse])

  const getUserprojects = async ()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader ={
       "Authorization" : `Bearer ${token}`
    }
    try{
      const result = await getUserProjectsAPI(reqHeader)
      console.log(result);
      if(result.status==200){
        setUserProjects(result.data)
      }

    }catch(err){
      console.log(err);
    }
  }

  const handleDeleteProject = async(projectId)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type" :"application/json" ,
        "Authorization" : `Bearer ${token}`
      }
      //api call
      const result = await removeProjectAPI(projectId,reqHeader)
      if(result.status==200){
        getUserprojects()
      }else{
        console.log(result);
        
      }
    }
  }



  return (
    <>
      <div>
        <div className="d-flex justify-content-between w-100">
          <h2 className='text-warning'>All Project</h2>
          <button className='btn'> <Add/> </button>
        </div>
        <div className="mt-4">
          {
            userProjects?.length>0 ?
            userProjects?.map(project=>(
              <div className="d-flex justify-content-between border p-2 rounded mb-3">
            <h3>{project?.title}</h3>
            <div className="icons d-flex">
             <div > <Edit project={project}/></div>
             <div className="btn"><a href={project?.github} target='_blank'><i class="fa-brands fa-github"></i></a></div>
             <button onClick={()=>handleDeleteProject(project?._id)} className='btn mb-2'><i class="fa-solid fa-trash text-danger"></i></button>
            </div>
          </div>
            ))
            :
            <div className="fw-bolder text-warning">NO Project Uploaded yett!!!</div>
          }
        </div>
      </div>
    </>
  )
}

export default View