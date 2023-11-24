import React from 'react'
import Modal from 'react-bootstrap/Modal';
function CommonModal(props) {


  return (
    <Modal show={props?.show} centered size={props?.size} onHide={props?.handleCloseBtn}>
    <Modal.Header closeButton>
      <Modal.Title>{props?.Title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {props?.Content}
    </Modal.Body>
  </Modal>
  )
}

export default CommonModal
