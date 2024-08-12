import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginimg from '../assets/loginimg.jpg'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { tokenAuthContext } from '../contexts/TokenAuth';

function Auth({insideRegister}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const naviage = useNavigate()
  const [userInputs,setUserInputs] =useState({
    username:"",email:"",password:""
  })
  console.log(userInputs);

  const handleRegister = async (e) =>{
    e.preventDefault()
    if(userInputs.username && userInputs.email && userInputs.password){
      //api call

        try{
            const result = await registerAPI(userInputs)
            console.log(result);
            if(result.status==200){
              toast.success(`Welcome ${result.data.username}.. please login to Explore our website!!!`)
              setUserInputs({username:"",email:"",password:""})
              setTimeout(()=>{
                naviage('/login')
              },2000);
            }else{
              toast.error(result.response.data)
              setTimeout(()=>{
                setUserInputs({username:"",email:"",password:""})
                naviage('/login')
              }, 2000)
            }
        }
        catch(err){
            console.log(err);
        }

    }
    else{
      toast.warning('please fill the form completely!!!')
    }
  }

  const handleLogin = async (e)=>{
    e.preventDefault()
    if(userInputs.email && userInputs.password){
      //API call
      try {
        const result = await loginAPI(userInputs)
        if(result.status==200){
          //store existingUser ande token
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)
          toast.success(`welcome ${result.data.existingUser.username}...`)
          setUserInputs({username:"",email:"",password:""})

          setTimeout(()=> {
            naviage('/')
          }, 2000)
        }else{
          toast.error(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }else{
      toast.warning('please fill the form completely!!!')
    }
  }


  return (
    <>
        <div style={{width:'100%',height:"100vh"}} className='d-flex justify-content-center align-items-center'>
          <div className="container w-75">
            <Link to={'/'} style={{textDecoration:'none'}} className='fw-bolder'>Back to Home <i class="fa-solid fa-arrow-left"></i></Link>
            <div className="card shadow p-5">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <img width={"100%"} src={loginimg} alt="Auth" />
                </div>
                <div className="col-lg-6">
                  <h1 className='fw-bolder mt-2'>
                  <i class="fa-brands fa-docker"></i>
                  Project Fair
                  </h1>
                  <h5 className='fw-bolder mt-2'>
                    Sign { insideRegister?'up':'in'} to Your Account
                  </h5>
                  <form>
                    {
                      insideRegister &&
                      <FloatingLabel
                      controlId="floatingInputName"
                      label="Username"
                      className="mb-3"
                  >
                   <Form.Control value={userInputs.username} onChange={e=>setUserInputs({...userInputs,username:e.target.value})} type="text" placeholder="Enter your Username" />
                    </FloatingLabel>
                    }
                  <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                      className="mb-3"
                  >
                   <Form.Control value={userInputs.email} onChange={e=>setUserInputs({...userInputs,email:e.target.value})}  type="email" placeholder="name@example.com" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control value={userInputs.password} onChange={e=>setUserInputs({...userInputs,password:e.target.value})}  type="password" placeholder="Password" />
                   </FloatingLabel>

                   {
                    insideRegister ? <div className='mt-3'>
                      <button onClick={handleRegister} className='btn btn-primary'> Register</button>
                      <p>Already have an account?Click here to<Link to={'/login'}>Login</Link></p>
                    </div>:
                    <div className='mt-3'>
                      <button onClick={handleLogin} className='btn btn-danger'>Login</button>
                      <p>New user?Click here to<Link to={'/register'}> Register</Link></p>
                    </div>
                   }
       
                  </form>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer position='top-center'theme='colored'autoClose={3000}/>
        </div>
    </>
  )
}

export default Auth