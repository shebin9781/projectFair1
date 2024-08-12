import React from 'react'
import Card from 'react-bootstrap/Card';
import image from '../assets/usericon.png'

function Clint() {
  return (
    <>
        <div className='d-flex justify-content-evenly align-items-center mb-5 flex-column'>

            <h1>Our Testimonals</h1>

            <div className='d-flex justify-content-evenly align-items-center ms-5'>
                <Card style={{ width: '18rem' }}>
              <Card.Body className='d-flex justify-content-center align-items-center flex-column'>
                <span>Max Miller</span>
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src={image} alt="" />
                <Card.Text>
               <div className='d-flex d-flex justify-content-center'>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star "></i>
                    <i class="fa-solid fa-star "></i>
                    <i class="fa-solid fa-star "></i>
                    <i class="fa-solid fa-star "></i>
               </div>
             <p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic temporibus ex quibusdam dolorem eum eveniet corrupti veniam suscipit unde ab doloremque necessitatibus deleniti qui molestias totam, quae dolor in saepe.
             </p>
                </Card.Text>
              </Card.Body>
            </Card>
            <div className='d-flex justify-content-evenly align-items-center ms-5 '>
                <Card style={{ width: '18rem' }}>
              <Card.Body className='d-flex justify-content-center align-items-center flex-column'>
                <span>vasu</span>
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src={image} alt="" />
                <Card.Text>
               <div className='d-flex d-flex justify-content-center'>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
               </div>
             <p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic temporibus ex quibusdam dolorem eum eveniet corrupti veniam suscipit unde ab doloremque necessitatibus deleniti qui molestias totam, quae dolor in saepe.
             </p>
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
            <div className='d-flex justify-content-evenly align-items-center ms-5'>
                <Card style={{ width: '18rem' }}>
              <Card.Body className='d-flex justify-content-center align-items-center flex-column'>
                <span>mattayi</span>
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src={image} alt="" />
                <Card.Text>
               <div className='d-flex d-flex justify-content-center'>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star "></i>
                    <i class="fa-solid fa-star "></i>
                   
               </div>
             <p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic temporibus ex quibusdam dolorem eum eveniet corrupti veniam suscipit unde ab doloremque necessitatibus deleniti qui molestias totam, quae dolor in saepe.
             </p>
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
             <div className='d-flex justify-content-evenly align-items-center ms-5 '>
                <Card style={{ width: '18rem' }}>
              <Card.Body className='d-flex justify-content-center align-items-center flex-column'>
                <span>Dubai jose</span>
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src={image} alt="" />
                <Card.Text>
               <div className='d-flex d-flex justify-content-center'>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star "></i>
                    <i class="fa-solid fa-star "></i>
               </div>
             <p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic temporibus ex quibusdam dolorem eum eveniet corrupti veniam suscipit unde ab doloremque necessitatibus deleniti qui molestias totam, quae dolor in saepe.
             </p>
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
            </div>
            
        </div>
        
    </>
  )
}

export default Clint