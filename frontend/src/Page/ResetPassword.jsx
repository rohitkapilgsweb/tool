import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ResetPassword() {

  return (
    <div>
       <Container>
          <div className="new_google_form text-center">
            <Row className=" new_google_form d-flex align-items-center ">
              <Col sm={4}></Col>
              <Col sm={4} className="new_form " >

                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    
                      <Col sm={12}>
                        <Form.Control type="email" placeholder="Email" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="">
                      <Col sm={{ span: 12}}>
                        <Button type="submit" className="w-100">Sign in</Button>
                      </Col>
                    </Form.Group>
                      <Col sm={{ span: 12}} className="pt-3 text-center">
                          <p className="new_link_a mb-0" > No account? <span><a href="/Createone">Create one</a></span> </p>
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

export default ResetPassword;