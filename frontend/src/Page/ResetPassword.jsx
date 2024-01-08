import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ForgetPassword } from '../redux/actions/LoginAction';

function ResetPassword() {
  const [email, setEmail] = useState()
  const dispatch = useDispatch()

const forgetPasskey  = () =>{
  dispatch(ForgetPassword({email:email}))
}

  return (
    <div>
       <Container>
          <div className="new_google_form text-center">
            <Row className=" new_google_form d-flex align-items-center ">
              <Col sm={4}></Col>
              <Col sm={4} className="new_form">
                 <h3 className='mb-4'>Reset Password</h3>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    
                      <Col sm={12}>
                        <Form.Control type="email" onChange={(e)=> setEmail(e?.target?.value)}  placeholder="Enter Registered Email" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="">
                      <Col sm={{ span: 12}}>
                        <Button type="submit" onClick={forgetPasskey} className="w-100">Sign in</Button>
                      </Col>
                    </Form.Group>
                      <Col sm={{ span: 12}} className="pt-3 text-center">
                          <p className="new_link_a mb-0" > No account? <span><Link to="/register">Create one</Link></span> </p>
                      </Col>
              </Col>  
              <Col sm={4}></Col>    
            </Row>  
        </div>      
    </Container> 
    
    </div>
  )
}

export default ResetPassword;