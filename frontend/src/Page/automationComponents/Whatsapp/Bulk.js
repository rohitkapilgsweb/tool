import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import Modal from 'react-bootstrap/Modal';
import { Field, Form } from 'react-final-form';
function Bulk() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onSubmit = async (values) => {
        console.log(values)
    }
  return (
    <div>
      <button onClick={handleShow} className='btn hero-body d-flex align-items-center gap-1'><HiOutlineDocumentAdd size={25}/> <span>Add New Groups</span></button>
        
       <Table  responsive hover>
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Total Contacts</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>61 Years Old</td>
          <td>99+</td>
          <td><span>Edit</span> <span>delete</span></td>
        </tr>
      
        
      </tbody>
    </Table>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
        <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <>
            <Field
            className="form-control mb-3"
            name="GroupName"
            component="input"
            type="text"
            placeholder="Create Group Name"
          />

          <Field
          className="form-control mb-3"
          name="numberLists"
          component="textarea"
          type="text"
          placeholder="List Of Mobile Numbers EX: 9112345678, 123456789000"
        />

        <button className='btn bg-dark text-white'> Save
            </button>
        </>
        )}/>

        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Bulk
