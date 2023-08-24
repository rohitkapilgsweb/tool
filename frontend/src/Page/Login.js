import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
// import FacebookLogin from '@greatsumini/react-facebook-login';
// import { useDispatch } from 'react-redux'
// import { LoginActions } from '../redux/actions/LoginAction';
function Login() {
  // const dispatch = useDispatch();

  // var meindata = {
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

    
  return (
    <div>
       <Container>
          <div className="new_google_form text-center">
            <Row className=" new_google_form d-flex align-items-center ">
              <Col sm={4}></Col>
              <Col sm={4} className="new_form " >

                <Form>
                    <Form.Group as={Row} className="mb-3">
                      <Col sm={{ span: 12}}>
                        <Button className="new_google w-100" type="submit">Continue with Google</Button>
                      </Col>
                    </Form.Group>
                    <Col sm={{ span: 12}} className="new_or pb-3">
                          or
                      </Col>
                  
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    
                      <Col sm={12}>
                        <Form.Control type="email" placeholder="Email" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                      
                      <Col sm={12}>
                        <Form.Control type="password" placeholder="Password" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="">
                      <Col sm={{ span: 12}}>
                        <Button type="submit" className="w-100">Sign in</Button>
                      </Col>
                    </Form.Group>
                    <Col sm={{ span: 12}} className="py-3 text-center">
                          <Link className="new_link_a" to="/resetpassword">  Reset password </Link>
                      </Col>
                      <Col sm={{ span: 12}} className=" text-center">
                          <p className="new_link_a mb-0" > No account? <span><a href="/Createone">Create one</a></span> </p>
                      </Col>
                  </Form>
              </Col>  
              <Col sm={4}></Col>    
            </Row>  
        </div>      
    </Container> 
      
        
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