import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

function Createone() {
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
                          <Link className=" new_link_a" to="/resetpassword">  Reset password </Link>
                      </Col>
                      <Col sm={{ span: 12}} className="pb-3 text-center">
                          <p className="mb-0 new_link_a"><span><a href="/login">Login</a></span> </p>
                      </Col>
                  </Form>
              </Col>  
              <Col sm={4}></Col>    
            </Row>  
        </div>      
    </Container> 
      
        
      
    </div>
  )
}

export default Createone;