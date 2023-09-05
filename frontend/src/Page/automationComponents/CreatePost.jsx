import React from 'react'
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import {FaRegEdit} from 'react-icons/fa';
import {AiOutlineDelete} from 'react-icons/ai';

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
                <ul className='d-flex gap-3 mt-1'>
                  <li> <span class="alert alert-success p-1" > Publish </span> </li>
                  <li> <span class="alert alert-danger p-1" > UnPublish </span> </li>
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