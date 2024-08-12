import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { SERVER_URL } from '../services/serverUrl';


function ProjectCard({displayData}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card onClick={handleShow} className='shadow btn' style={{ width: '28rem' }}>
      <Card.Img height={'200px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImage}`}  alt={displayData?.title}/>
      <Card.Body>
        <Card.Title className='text-center mb-5'>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className="col-lg-6">
              <img width={'380px'} src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} alt= {displayData?.title}/>
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              
             <h6>  <span className='fw-bolder'>Langugase Used</span>{displayData?.language}</h6>
             <p style={{textAlign:'justify'}}> <span className='fw-bolder'>Description : </span>
             {displayData?.overview}
              </p>
            </div>
          </div>
           <div className="float-start mt-2">
            <a href={displayData?.github}  target='-blank' className='btn btn-secondary'>
            <i class="fa-brands fa-github"></i>
            </a>
            <a href={displayData?.website} target='-blank' className='btn btn-secondary ms-2'>
            <i class="fa-solid fa-link"></i>
            </a>
           </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard