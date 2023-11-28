import React, { useState } from 'react'
import CreateTemplates from './components/CreateTemplates'
import CommonModal from './components/CommonModal'

function AllEmailTemplate() {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
      };
      const handleShow = () => setShow(true);
  return (
    <div>
      <button type="button" onClick={handleShow} class="btn btn-primary">Button</button>

     

      <CommonModal
     Title="New Email Template"
     show={show} 
     size={'xl'} 
     handleCloseBtn={handleClose} 
     Content={ <CreateTemplates/>}
    />
    </div>
  )
}

export default AllEmailTemplate
