import React from 'react'

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';

function FB_Settings() {
  return (
    <div>
      <Form>  
       
      <Container>
          <Row>
          <p className="my-4">Facebook General Settings</p>
            <Col sm={4}>
              <p>Enable Autoposting to Facebook</p>
            </Col>
            
            <Col sm={8}>
              <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                />
            </Col>
          </Row> 
        
        
          
          <Row>
          <p className="my-4">Facebook API Settings </p>
            <Col sm={4}>
              <p>Facebook APP Method</p>
            </Col>
            
            <Col sm={8}>
              <Button variant="primary">Add Facebook Account</Button>
            </Col>
            <Col sm={12} className="">
            <Button variant="primary">Save</Button>
            </Col>
          </Row> 
        </Container>
      </Form> 

    </div>
    
  )
}

export default FB_Settings
