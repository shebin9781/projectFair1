import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../contexts/TokenAuth';
function Header({insideDashBoard}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  const navigate = useNavigate()
  const logout =()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }

  return (
    <div>
       <Navbar style={{zIndex:'1'}} className="card shadow top-0 position-fixed w-100">
        <Container>
          <Navbar.Brand><Link style={{textDecoration:"none"}} className='fw-bolder' to={"/"}><i class="fa-brands fa-docker me-2"></i>Project Fair</Link></Navbar.Brand>
          {insideDashBoard && <div className='ms-auto'>
            <button onClick={logout} className='btn btn-link'>Logout <i class="fa-solid fa-right-from-bracket me-3"></i></button>
          </div>}
        </Container>
      </Navbar>
    </div>
  )
}

export default Header