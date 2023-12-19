import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import List from './CreatePost/List'
import { BsFileEarmarkPost, BsFillFileEarmarkPostFill } from 'react-icons/bs';
import {RiDraftLine} from 'react-icons/ri'
import SinglePost from './SinglePost';
import { BiSolidCloudUpload, BiTimeFive } from 'react-icons/bi';
import {HiOutlineDocumentAdd} from 'react-icons/hi'

function Post() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div color="container pt-4">
    <div className="row justify-content-center align-items-center m-0 ">
     <div className="col  px-5 mt-3">
      <button onClick={handleShow} className='btn hero-body d-flex align-items-center gap-1 position-fixed'><HiOutlineDocumentAdd size={25}/> <span>Add Post</span></button>
 <div className="menu-box Post-tabs " >

 <Tabs
   defaultActiveKey="allPost"
   id="uncontrolled-tab-example"
   className="mt-3 gap-3  mb-3"
 >
   <Tab eventKey="allPost" title={<><BsFileEarmarkPost size={20}/> <span className='white-space'> All Post</span></>}>
   <List/>
   </Tab>
   <Tab eventKey="draft" title={<><RiDraftLine size={20}/> <span className='white-space'> Draft Post</span></>}>
   Secound
   </Tab>
   <Tab eventKey="schedule" title={<><BiTimeFive size={20}/> <span className='white-space'> Schedule  Post</span></>}>
   schedule 
   </Tab>
   <Tab  eventKey="Publish" title={<><BiSolidCloudUpload  size={20}/> <span className='white-space'> Publish</span></>} >
   Publish
   </Tab>
  
 </Tabs>
 </div>
     </div>
    </div>


    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body><SinglePost close={handleClose}/></Modal.Body>
      </Modal>
   </div>

  )
}

export default Post