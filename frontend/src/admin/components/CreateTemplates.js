import React, { useRef, useState } from 'react'
import EmailEditor from 'react-email-editor';
import template from '../template.json'
import CommonModal from './CommonModal';
import SendEmailTemplate from './SendEmailTemplate';
function CreateTemplates() {
    const emailEditorRef = useRef(null);
    const [show, setShow] = useState(false);
    const [htmls,setHtmls] = useState()
    const handleClose = () => {
        setShow(false)
      };
      const handleShow = () => setShow(true);
    const exportHtml = () => {
      const unlayer = emailEditorRef.current?.editor;
  
      unlayer?.exportHtml((data) => {
        const { design, html } = data;
        console.log('exportHtml', html);
        setHtmls(html)
      });
    };
  

    const onReady = (unlayer) => {
      if (unlayer) {
  
      }
    };
  return (
<div>
      <div className='d-flex'>
        <h1>Create Template</h1>
        <button className='btn text-white py-2 fs-4 d-block ms-auto  mb-4' style={{ background: "var(--theme-mein)" }} onClick={exportHtml}>Save Template</button>
      </div>

     <div className='editor-ing'>
        <EmailEditor
        // onLoad={onLoad}
        ref={emailEditorRef}
        onReady={onReady}
      />
     </div>

    <CommonModal
     Title="Add New Plans"
     show={show} 
     size={'lg'} 
     handleCloseBtn={handleClose} 
     Content={<SendEmailTemplate/>}
    />
    </div>
    
  )
}

export default CreateTemplates
