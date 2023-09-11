import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { userLoginAction } from '../redux/actions/LoginAction';
import Loader from './Components/Loader';
import { toast } from 'react-toastify';


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state)=> state?.UserLogin?.isLoading)
  const notify = (msg) => toast(msg);
  console.log(isLoading)
  // const isLoading = useSelector(state=> state)
   const onSubmit = async values => {
   dispatch(userLoginAction(JSON.stringify(values)))
   .then((res)=>{
    let success = res?.payload?.success;
    let status = res?.payload?.status;
    if(success === true){
      if(res.meta.requestStatus === "fulfilled"){
        localStorage.setItem("token", res.payload.userToken)
        navigate('/')
        window.location.reload()
      }
    }else{
      console.log(status,"ghjkhgh")
      if(success === false && !status){
        let msg = "User Not Registered"
        notify(msg)
      }else if(success === false && status){
       let msg = "Wrong Password"
        notify(msg)
      }
     
    }
   })
  
  }

    
  return (
    <div className='bg-login'>
      {isLoading && <Loader/>}
       <Container>
          <div className="new_google_form text-center">
            <Row className=" new_google_form d-flex align-items-center justify-content-center ">
              <Col sm={4} className="new_form " >
                <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                  <form onSubmit={handleSubmit}>
                   
                      <Col sm={{ span: 12}}>
                        <Button className="new_google w-100" type="submit">Continue with Google</Button>
                      </Col>
                 
                    <Col sm={{ span: 12}} className="new_or pb-3">
                          or
                      </Col>
                      <Col sm={12} className="mb-4">
                      <Field
                          className="form-control"
                          name="email"
                          component="input"
                          type="email"
                          placeholder="Email"
                        />
                      </Col>
                   

                   
                      
                      <Col sm={12} className="mb-4">
                      <Field
                          className="form-control"
                          name="password"
                          component="input"
                          type="password"
                          placeholder="Create Password"
                        />
                      </Col>
                   

                  
                      <Col sm={{ span: 12}}>
                      <button  className="w-100 bg-black btn text-white" type="submit" disabled={submitting || pristine}>
                        Sign in
                      </button>
                      </Col>
                   
                    <Col sm={{ span: 12}} className="py-3 text-center">
                          <Link className="new_link_a" to="/resetpassword">  Reset password </Link>
                      </Col>
                      <Col sm={{ span: 12}} className=" text-center">
                          <p className="new_link_a mb-0" > No account? <span><Link to="/register">Create one</Link></span> </p>
                      </Col>
                      </form>
                )}
              />
              </Col>  
            </Row>  
        </div>      
    </Container> 
      
        

   {/* var meindata = {
  //   userdata:[/]
  // }

  //   async function getUserData(accessToken) {
  //       const url = "https://graph.facebook.com/v17.0/me?access_token=" + accessToken;
        
  //       try {
  //         const response = await fetch(url);
  //         const userData = await response.json();
  //         console.log(userData,"userdata");
         
  //         meindata.userdata.push({accessToken: accessToken})
  //         facepageData(userData.id, accessToken)
  //         localStorage.setItem("accessToken", accessToken)
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     }
      
      
      
  //     async function facepageData(facepageData,accessToken) {
  //       const url = `https://graph.facebook.com/v17.0/${facepageData}/accounts?access_token=` + accessToken;
        
  //       try {
  //         const response = await fetch(url);
  //         const fbPageData = await response.json();
  //         console.log(fbPageData.data[0],"fbpagedata");
  //         localStorage.setItem("pageToken", fbPageData.data[0].access_token)
  //         meindata.userdata.push({page_token: fbPageData.data[0].access_token})
  //         meindata.userdata.push({page_name: fbPageData.data[0].name})
  //         meindata.userdata.push({page_id: fbPageData.data[0].id})
  //         meindata.userdata.push({category: fbPageData.data[0].category})
  //         localStorage?.setItem("userRole","fbUser")
  //         dispatch(LoginActions(meindata))
  //         .then((res)=>{
  //           console.log(res)
  //         })
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       } 
  //     }

  //     console.log(meindata,"aaaaaaaaaaaaaaaa")

    
        {/* <FacebookLogin
  appId="158402927285129"
  // onSuccess={(response) => {
    console.log('Login Success!', response);
    getUserData(response.accessToken)
  }}
  onFail={(error) => {
    console.log('Login Failed!', error);
  }}
  onProfileSuccess={(response) => {
    console.log('Get Profile Success!', response);
    meindata.userdata.push(response)
  }}
/> */}
    </div>
  )
}

export default Login;