import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import uplodedimg from '../assets/uploded.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';
function Add() {
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [preview,setPreview] = useState("")
  const [imageFileStatus,setImageFileStatus] = useState(false)

 const [projectDetails,setProjectDetails]=useState({
  title:"",language:"",overview:"",github:"",website:"",projectImage:""
 })
  const [show, setShow] = useState(false);

  const handleClose = () => {
    
    setShow(false)
    setProjectDetails({ title:"",language:"",overview:"",github:"",website:"",projectImage:""})
  
  
  };
  const handleShow = () => setShow(true);

  console.log(projectDetails);


  useEffect(()=>{
    if(projectDetails.projectImage.type=="image/png" || projectDetails.projectImage.type=="image/jpg" || projectDetails.projectImage.type=="image/jpeg"){
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }else{
      setPreview(uplodedimg)
      setImageFileStatus(false)
      setProjectDetails({...projectDetails,projectImage:""})
    }
  },[projectDetails.projectImage])

  const handleUploadProject = async ()=>{
    const {title,language,overview,github,website,projectImage} = projectDetails

    if(!title || !language || !overview || !github || !website || !projectImage){
      toast.warning("please fill the form completely!!!")
    }else{

      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        //api call
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            setAddResponse(result)
            handleClose()
          }else{
            toast.warning(result.response.data)
          }

        }catch(err){
          console.log(err);
        }
      }
      
    }

  }



  return (
    <>
      <button onClick={handleShow}  className='btn'><i class="fa-solid fa-plus me-1"></i> Add New</button>
      

      <Modal
      size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input type='file' style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                <img height={'200px'} className='img-fluid' src={preview} alt="" />
              </label>
              {!imageFileStatus && <div className="text-danger my-2">*upload only following file types(png,jpg,jpeg) here!!!</div>}
            </div>
            <div className="col-lg-8">
             <div className='mb-2'> 
              <input type="text" className='form-control' placeholder='Project Titel' value={projectDetails.title} onChange={(e)=>{setProjectDetails({...projectDetails,title:e.target.value})}} />
            </div>
            <div className='mb-2'> 
              <input type="text" className='form-control' placeholder='Languages Used In The Project' value={projectDetails.language} onChange={(e)=>{setProjectDetails({...projectDetails,language:e.target.value})}} />
            </div>
            <div className='mb-2'> 
              <input type="text" className='form-control' placeholder='Project GITHUB Link' value={projectDetails.github} onChange={(e)=>{setProjectDetails({...projectDetails,github:e.target.value})}} />
            </div>
            <div className='mb-2'> 
              <input type="text" className='form-control' placeholder='Project WEBSITE Link' value={projectDetails.website} onChange={(e)=>{setProjectDetails({...projectDetails,website:e.target.value})}}  />
            </div>
            </div>
          </div>
          <div className='mb-2 mt-3'> 
              <input type="text" className='form-control' placeholder='project Overview' value={projectDetails.overview} onChange={(e)=>{setProjectDetails({...projectDetails,overview:e.target.value})}}  />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUploadProject} >Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center'theme='colored'autoClose={3000}/>
    </>
  )
}

export default Add