import React from 'react'
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import {FaRegEdit} from 'react-icons/fa';
import {AiOutlineDelete} from 'react-icons/ai';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function CreatePost() {
  return (
    <div>
      <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date Update</th>
              <th>Close Date</th>   
              <th>Check</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>yr</td>
              <td>4-9-2023</td>
              <td>4-9-2023</td>
              <td><FaRegEdit/> <AiOutlineDelete/> </td>
              <td >
                <ul className='d-flex gap-3'>
                  <li><span>Publish</span></li>
                  <li> <span className=''>UnPublish</span></li>
                </ul> 
              </td>
            </tr>
            
            
          </tbody>
        </Table>
      </Container>
    </div>  
  )
}

export default CreatePost