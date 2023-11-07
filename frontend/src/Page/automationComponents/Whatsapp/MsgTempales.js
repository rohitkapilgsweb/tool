import React, { useState } from 'react'
import { Field, Form } from 'react-final-form'

function MsgTempales() {


    const onSubmit = async (values) => {
    console.log(values?.msgTemplate)
  
      }
  return (
   <div>
    <Form
 onSubmit={onSubmit}
 render={({ handleSubmit, form, submitting, pristine, values }) => (
   <form onSubmit={handleSubmit}>
    <div className="container">
     <div className="row">
         <div className="col-md-6">
       <Field
       className="form-control mb-3"
       name="msgTemplate"
       component="textarea"
       type="text"
       placeholder="Messages"
     />
     <button type='Sumbit' className='bg-dark text-white btn'>Save</button>
     </div>
     <div className="col-md-6 whatapps rounded m-0 px-0" >
       <div className="whatapps_new border rounded" >
         <div className="whatapp_title py-2 mb-2 px-2">
             <h6 className="mb-0">Preview</h6>
         </div>
         <div className="whatapps_chat ps-3 px-2 py-2">
           {values?.msgTemplate && <p className="my-2 position-relative"> <span className="icon_message"></span> <p className="message-body ">{values?.msgTemplate}</p> </p>}
         </div>
       </div>  
     </div>
     </div>
    </div>
   </form>
 )}
 />
</div>
  )
}

export default MsgTempales
